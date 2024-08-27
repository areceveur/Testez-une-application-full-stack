import {AuthService} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {SessionInformation} from "../../../interfaces/sessionInformation.interface";
import {LoginRequest} from "../interfaces/loginRequest.interface";
import { expect } from '@jest/globals';
import {Router} from "@angular/router";
import {RegisterRequest} from "../interfaces/registerRequest.interface";

describe('AuthService', () => {
  let service: AuthService;
  let routerMock: any;

  routerMock = {
    navigate: jest.fn()
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService,
        {provide: Router, useValue: routerMock}]
    });
    service = TestBed.inject(AuthService);
  });

  const mockSessionInformation: SessionInformation = {
    id: 1,
    firstName: "Admin",
    lastName: "ADMIN",
    admin: true,
    token: '',
    type: 'Bearer',
    username: "Admin ADMIN"
  }

  it('should login correctly', () => {
    const loginRequest: LoginRequest = {
      email: "yoga@studio.com",
      password: "test!1234"
    };
    service.login(loginRequest).subscribe((sessionInformation: SessionInformation) => {
      expect(sessionInformation).toEqual(mockSessionInformation);
    });
  });

  it('should register correctly', () => {
    const registerRequest: RegisterRequest = {
      email: "yoga@studio.com",
      password: "test!1234",
      firstName: "User",
      lastName: 'TEST'
    };

    service.register(registerRequest).subscribe(() => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    })

  })
})
