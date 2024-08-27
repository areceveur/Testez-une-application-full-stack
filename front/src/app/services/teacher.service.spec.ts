import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import {Teacher} from "../interfaces/teacher.interface";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('TeacherService', () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;

  const mockTeacherService: Teacher[] = [
    {
      id: 1,
      lastName: 'User',
      firstName: 'Test',
      createdAt: new Date("2024-08-02"),
      updatedAt: new Date("2024-08-03")
    },
    {
      id: 2,
      lastName: 'Doe',
      firstName: 'John',
      createdAt: new Date("2024-08-01"),
      updatedAt: new Date("2024-08-04")
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [TeacherService]
    });
    service = TestBed.inject(TeacherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('should retrieve all teachers', () => {
    service.all().subscribe((teachers: Teacher[]) => {
      expect(teachers.length).toBe(2);
      expect(teachers).toEqual(mockTeacherService);
    });

    const req = httpMock.expectOne(service['pathService']);
    expect(req.request.method).toBe('GET');

    req.flush(mockTeacherService);
  });

  it('should show one of the teachers', () => {
    const teacherId = '1';

    service.detail(teacherId).subscribe((teacher: Teacher) => {
      expect(teacher).toEqual(mockTeacherService);
    });
    const req = httpMock.expectOne(`${service['pathService']}/${teacherId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeacherService);
  });
});
