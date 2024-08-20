import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import {of} from "rxjs";
import {TeacherService} from "../../../../services/teacher.service";

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockSessionApiService: any;
  let mockMatSnackBar: any;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockTeacherService = {
    all: jest.fn().mockReturnValue(of([{ id: 1, firstName: 'Margot', lastName: 'Delahaye' }]))
  };

  beforeEach(async () => {
    mockSessionApiService = {
      create: jest.fn().mockReturnValue(of({success: true })),
      update: jest.fn(),
      detail: jest.fn()
    };

    mockMatSnackBar = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: SessionApiService, useValue: mockSessionApiService }
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a session', () => {
    fixture.detectChanges();
    component.sessionForm?.controls['name'].setValue('Yoga');
    component.sessionForm?.controls['date'].setValue('2024-07-15');
    component.sessionForm?.controls['teacher_id'].setValue(1);
    component.sessionForm?.controls['description'].setValue('Session de yoga avec Margot Delahaye');
    component.submit();

    fixture.whenStable().then(() => {
      expect(mockSessionApiService.create).toHaveBeenCalledWith(component.sessionForm?.value)
    });
    expect(mockMatSnackBar.open).toHaveBeenCalledWith('Session created !', 'Close', { duration : 3000})
  })
});
