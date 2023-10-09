import { Validators } from '@angular/forms';

export const FORM_CONTROLS = {
  firstname: ['', Validators.required],
  lastname: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
};
