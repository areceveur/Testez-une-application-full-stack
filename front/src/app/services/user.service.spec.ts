import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../interfaces/user.interface";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUserService: User = {
    id: 1,
    email: "user@test.com",
    lastName: "TEST",
    firstName: "User",
    admin: false,
    password: '',
    createdAt: new Date("2024-08-02"),
    updatedAt: new Date("2024-08-03")
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a user by id', () => {
    const userId = '1';

    service.getById(userId).subscribe((user: User) => {
      expect(user).toEqual(mockUserService);
    });
    const req = httpMock.expectOne(`${service['pathService']}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserService);
  });

  it('should display the button "delete"', () => {
    const userId = '1';
    service.delete(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['pathService']}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
