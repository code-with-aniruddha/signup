import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignupService } from './services/signup.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError, of } from 'rxjs';
import { SignupForm } from './models';

describe('AppComponent', () => {
  const fb: FormBuilder = new FormBuilder();

  let component: AppComponent,
    fixture: ComponentFixture<AppComponent>,
    signupServiceSpy: SignupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: FormBuilder, useValue: fb }],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = await TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    signupServiceSpy = TestBed.inject(SignupService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as loading defined`, () => {
    expect(component.isLoading).toBeFalsy;
  });

  it(`should have as signedUp defined`, () => {
    expect(component.notificationMessage).toEqual('');
  });

  it('isValid should return true on submit', () => {
    component.form.patchValue({
      firstname: 'test',
    });
    const isValidReturn = component.isValid('firstname', true);
    expect(isValidReturn).toBeTruthy;
  });

  it('isValid should return false on submit', () => {
    component.form.patchValue({
      firstname: '',
    });
    const isValidReturn = component.isValid('firstname', true);
    expect(isValidReturn).toBeFalsy;
  });

  it('isValid should return false', () => {
    component.form.patchValue({
      firstname: 'test',
    });
    const isValidReturn = component.isValid('firstname', false);
    expect(isValidReturn).toBeFalsy;
  });

  it('isValid should return false on submit', () => {
    component.form.patchValue({
      firstname: '',
    });
    const isValidReturn = component.isValid('firstname', true);
    expect(isValidReturn).toBeFalsy;
  });

  it('should invoke signup service on submit', async () => {
    spyOn(signupServiceSpy, 'signup').and.returnValue(of(true));
    component.form.setValue({
      firstname: 'first',
      lastname: 'last',
      email: 'test@test.com',
    });
    signupServiceSpy.signup(component.form.value as SignupForm).subscribe();
    await component.submit();
    expect(signupServiceSpy.signup).toHaveBeenCalled();
    expect(component.notificationMessage).toEqual('User saved successfully.');
    expect(component.isLoading).toBeFalsy;
  });

  it('signup should throw error', async () => {
    spyOn(signupServiceSpy, 'signup').and.returnValue(
      throwError(() => new Error())
    );
    component.form.setValue({
      firstname: 'first',
      lastname: 'last',
      email: 'test@test.com',
    });
    await component.submit();
    expect(component.isLoading).toBeFalsy;
    expect(component.notificationMessage).toEqual('Network error.');
  });
});
