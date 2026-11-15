import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../providers/auth/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loginForm: FormGroup;
	loginErrorMsg = '';
	loginError2 = false;
	isSubmitting = false;
	showPassword = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		public loginService: LoginService
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	onSubmit(): void {
		this.loginError2 = false;
		if (this.loginForm.invalid || this.isSubmitting) {
			this.loginForm.markAllAsTouched();
			this.loginError2 = true;
			this.loginErrorMsg = 'Enter a valid email address and password to continue.';
			return;
		}

		this.isSubmitting = true;
		this.loginService.validateLogin(this.loginForm.value).subscribe({
			next: (response: any) => {
				const result = response && response.body;
				if (result && result.code == 200 && result.token) {
					localStorage.setItem('neelgund-admin-token', result.token);
					localStorage.setItem('user', JSON.stringify(result));
					const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
					const destination = returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//')
						? returnUrl
						: '/dashboard';
					this.router.navigateByUrl(destination, { skipLocationChange: false }).then(navigated => {
						if (navigated) {
							window.location.reload();
						} else {
							this.isSubmitting = false;
							this.showLoginError('Unable to open the requested page. Please try again.');
						}
					});
					return;
				}

				this.isSubmitting = false;
				this.showLoginError(result && result.message ? result.message : 'The email or password is incorrect.');
			},
			error: error => {
				console.error('Login request failed:', error);
				this.isSubmitting = false;
				this.showLoginError('Unable to sign in right now. Check your connection and try again.');
			}
		});
	}

	clearLoginError(): void {
		this.loginError2 = false;
	}

	private showLoginError(message: string): void {
		this.loginErrorMsg = message;
		this.loginError2 = true;
	}
}
