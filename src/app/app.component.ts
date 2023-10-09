import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignupService } from './services/signup.service';
import { SignupForm } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isLoading: boolean = false;
  notificationMessage: string = '';
  subscription!: Subscription;

  form = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private signupService: SignupService) {}

  isValid(formElem: string, isSubmitted: boolean): boolean {
    return !!(
      this.form.get(formElem) &&
      (this.form.get(formElem)?.dirty || isSubmitted) &&
      this.form.get(formElem)?.invalid
    );
  }

  submit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.subscription = this.signupService
        .signup(this.form.value as SignupForm)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.notificationMessage = 'User saved successfully.';
          },
          error: () => {
            this.isLoading = false;
            this.notificationMessage = 'Network error.';
          },
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
