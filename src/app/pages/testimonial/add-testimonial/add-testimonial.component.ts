import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
import { TestimonialService } from '../../../providers/testimonial/testimonial.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {
  readonly uploadInput = new EventEmitter<UploadInput>();
  addTestimonialForm: FormGroup;
  ImageName = '';
  imagePath = environment.baseUrl + '/public/testimonial/';
  imageUrl = '';
  id: string | null = null;
  isEdit = false;
  isSaving = false;
  isLoading = false;
  loadError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private testimonialService: TestimonialService,
    private toastr: ToastrManager
  ) {
    this.isEdit = this.route.snapshot.data.title === 'edit';
    this.addTestimonialForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      title: [''],
      location: [''],
      text: ['', Validators.required],
      featured: [false],
      job: [''],
      ratings: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit && this.id) {
      this.loadTestimonial(this.id);
    }
  }

  loadTestimonial(id: string): void {
    this.isLoading = true;
    this.testimonialService.getTestimonialWithId({ id }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.code !== 200 || !response.result) {
          this.loadError = response.message || 'Unable to load this testimonial.';
          return;
        }
        const data = response.result;
        this.ImageName = data.image || '';
        this.imageUrl = this.ImageName ? this.imagePath + this.ImageName : '';
        this.addTestimonialForm.patchValue({
          name: data.name,
          title: data.title,
          location: data.location,
          text: data.text,
          featured: data.featured,
          status: data.status,
          job: data.job,
          ratings: data.ratings
        });
      },
      error: (error: any) => {
        this.isLoading = false;
        this.loadError = error?.error?.message || 'Unable to load this testimonial. Please try again.';
      }
    });
  }

  onSubmit(): void {
    if (this.isSaving) {
      return;
    }
    if (this.addTestimonialForm.invalid) {
      this.addTestimonialForm.markAllAsTouched();
      return;
    }
    const payload = { ...this.addTestimonialForm.value, image: this.ImageName };
    this.isSaving = true;
    const request = this.isEdit && this.id
      ? this.testimonialService.editTestimonialdata(payload, this.id)
      : this.testimonialService.addTestimonial(payload);

    request.subscribe({
      next: (response: any) => {
        this.isSaving = false;
        if (response.code === 200) {
          this.toastr.successToastr(response.message);
          this.router.navigate(['/testimonial/view']);
        } else {
          this.toastr.errorToastr(response.message || 'Unable to save this testimonial.');
        }
      },
      error: (error: any) => {
        this.isSaving = false;
        this.toastr.errorToastr(error?.error?.message || 'Unable to save this testimonial. Please try again.');
      }
    });
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.uploadInput.emit({
        type: 'uploadAll',
        url: environment.baseUrl + '/api/testimonial/addimage',
        method: 'POST',
        data: {}
      });
    } else if (output.type === 'done' && output.file) {
      const imageName = output.file.response?.result;
      if (!imageName) {
        this.toastr.errorToastr('The image upload did not return a file name.');
        return;
      }
      this.ImageName = imageName;
      this.imageUrl = this.imagePath + imageName;
    } else if (output.type === 'rejected') {
      this.toastr.errorToastr('Unable to upload the image. Please try again.');
    }
  }

  removeImage(): void {
    this.ImageName = '';
    this.imageUrl = '';
  }

  onImageError(): void {
    this.imageUrl = '';
  }

  onCancel(): void {
    this.router.navigate(['/testimonial/view']);
  }
}
