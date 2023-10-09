import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignupForm } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  url: string = 'http://localhost:8080/api/user/signup';
  constructor(private http: HttpClient) {}

  signup(formData: SignupForm): Observable<boolean> {
    return this.http.post<boolean>(this.url, formData);
  }
}
