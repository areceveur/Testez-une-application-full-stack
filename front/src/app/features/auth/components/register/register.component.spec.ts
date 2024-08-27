import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {of, throwError} from "rxjs";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      register: jest.fn().mockReturnValue(of({ success: true }))
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register correctly', () => {
    const navigateSpy = jest.spyOn(routerMock, 'navigate');

    component.form.controls['email'].setValue('user@test.com');
    component.form.controls['firstName'].setValue('User');
    component.form.controls['lastName'].setValue('Test');
    component.form.controls['password'].setValue('UserTest1234');
    component.submit();

    expect(authServiceMock.register).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should send an error when the conditions are not respected', () => {
    authServiceMock.register.mockReturnValue(throwError({ error: 'Registration failed' }));

    component.form.controls['email'].setValue('user@test.com');
    component.form.controls['firstName'].setValue('User');
    component.form.controls['lastName'].setValue('Test');
    component.form.controls['password'].setValue('UserTest1234');
    component.submit();

    expect(component.onError).toBe(true);
  })
});
