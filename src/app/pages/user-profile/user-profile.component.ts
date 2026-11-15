import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from '../../providers/auth/login.service';

interface ProfileUser {
	_id?: string;
	username?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	address?: string;
	city?: string;
	country?: string;
	postal_code?: string | number;
	about?: string;
	role?: string;
}

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	addProfileForm: FormGroup;
	user: ProfileUser | null = null;
	id: string | null = null;
	submitted = false;
	isLoading = false;
	isSaving = false;
	loadError = false;
	saveError = '';

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private loginService: LoginService,
		private toastr: ToastrManager
	) {
		this.addProfileForm = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			address: ['', Validators.required],
			city: ['', Validators.required],
			country: ['', Validators.required],
			postal_code: ['', Validators.required],
			about: ['', Validators.required]
		});
	}

	ngOnInit(): void {
		const storedUser = localStorage.getItem('user');
		if (!storedUser) {
			this.loadError = true;
			return;
		}

		try {
			this.user = JSON.parse(storedUser);
			this.id = this.user && this.user._id ? this.user._id : null;
		} catch (error) {
			console.error('Unable to read the stored profile:', error);
			this.loadError = true;
			return;
		}

		if (this.id) {
			this.patchingdata(this.id);
		} else {
			this.loadError = true;
		}
	}

	get profileName(): string {
		const name = [this.user && this.user.first_name, this.user && this.user.last_name]
			.filter(Boolean)
			.join(' ')
			.trim();
		return name || (this.user && this.user.username) || 'Administrator';
	}

	get profileInitials(): string {
		const initials = this.profileName.split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join('');
		return initials.toUpperCase();
	}

	get locationLabel(): string {
		const location = [this.user && this.user.city, this.user && this.user.country]
			.filter(Boolean)
			.join(', ');
		return location || (this.user && this.user.address) || 'Location not set';
	}

	patchingdata(id: string | null): void {
		if (!id) {
			this.loadError = true;
			return;
		}
		this.isLoading = true;
		this.loadError = false;
		this.loginService.getUser({ id }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (!response || response.code !== 200 || !response.result) {
					this.loadError = true;
					console.error('Unable to load profile:', response && response.message);
					return;
				}
				this.user = response.result;
				this.addProfileForm.patchValue({
					username: this.user.username,
					email: this.user.email,
					first_name: this.user.first_name,
					last_name: this.user.last_name,
					address: this.user.address,
					city: this.user.city,
					country: this.user.country,
					postal_code: this.user.postal_code,
					about: this.user.about
				});
			},
			error: error => {
				console.error('Error loading profile:', error);
				this.isLoading = false;
				this.loadError = true;
			}
		});
	}

	hasError(controlName: string, errorName: string): boolean {
		return this.addProfileForm.controls[controlName].hasError(errorName);
	}

	onSubmit(): void {
		this.submitted = true;
		this.saveError = '';
		if (this.addProfileForm.invalid || this.isSaving || !this.id) {
			this.addProfileForm.markAllAsTouched();
			return;
		}

		const profileValues = this.addProfileForm.value;
		const payload = { ...profileValues, id: this.id };
		this.isSaving = true;
		this.loginService.updateProfile(payload).subscribe({
			next: (response: any) => {
				this.isSaving = false;
				if (!response || response.code !== 200) {
					this.saveError = response && response.message
						? response.message
						: 'Your profile could not be saved. Please try again.';
					this.toastr.errorToastr(this.saveError);
					return;
				}

				const responseUser = response.result && typeof response.result === 'object'
					? response.result
					: {};
				this.user = { ...(this.user || {}), ...profileValues, ...responseUser };
				localStorage.setItem('user', JSON.stringify(this.user));
				this.toastr.successToastr(response.message || 'Profile updated successfully.');
				this.submitted = false;
			},
			error: error => {
				console.error('Error saving profile:', error);
				this.isSaving = false;
				this.saveError = 'Your profile could not be saved. Please try again.';
				this.toastr.errorToastr(this.saveError);
			}
		});
	}

	onCancel(): void {
		this.router.navigate(['/dashboard']);
	}
}
