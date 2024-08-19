import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import {SessionInformation} from "../../../../interfaces/sessionInformation.interface";
import {AuthService} from "../../services/auth.service";
import {of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {executeProtractorBuilder} from "@angular-devkit/build-angular";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let sessionServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn()
    };

    sessionServiceMock = {
      logIn: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        SessionService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send an error when use a bad login', () => {
    const user = {
      email: "yoga@studio.com",
      password: "test!1234"
    };

    component.form.setValue(user);

    authServiceMock.login.mockReturnValue(throwError(() => new Error('Login failed')));

    component.submit();

    expect(authServiceMock.login).toHaveBeenCalledWith(user);
    expect(component.onError).toBe(true);
  });

  it('should login correctly', () => {
    const user = {
      email: "yoga@studio.com",
      password: "test!1234"
    };
    component.form.setValue(user);

    const sessionInformation: SessionInformation = {
      token: 'false-token',
      type: 'Bearer',
      id: 1,
      username: 'Admin Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      admin: true
    };

    authServiceMock.login.mockReturnValue(of(sessionInformation));

    component.submit();

    expect(authServiceMock.login).toHaveBeenCalledWith(user);
    expect(sessionServiceMock.logIn).toHaveBeenCalledWith(sessionInformation);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/sessions']);
  });
});
