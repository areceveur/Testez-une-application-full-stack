import { HttpClientModule } from '@angular/common/http';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
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
    window.addEventListener('unhandledrejection', event => {
      fail(event.reason);
    });
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

  it('should create a session', async () => {
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
  });

  it('should update a session', async () => {
    fixture.detectChanges();
    component.onUpdate = true;
    component.id = '1';

    component.sessionForm?.setValue({
      name: 'Updated Session',
      date: '2023-01-02',
      teacher_id: 2,
      description: 'Updated description'
    });

    mockSessionApiService.update.mockReturnValue(of({ name: 'Updated Session' }));
    component.submit();

    fixture.whenStable().then(() => {
      expect(mockSessionApiService.update).toHaveBeenCalledWith('1', component.sessionForm?.value)
      expect(mockMatSnackBar.open).toHaveBeenCalledWith('Session updated !', 'Close', { duration: 3000 });
    });
  });

  it('should redirect non-admin users', () => {
    mockSessionService.sessionInformation.admin = false;
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['/sessions']);
  });

  it('should display the information for the update', () => {
    mockSessionService.sessionInformation.admin = true;
    const mockSession = {
      name: 'Updated Session',
      date: '2023-01-02',
      teacher_id: 2,
      description: 'Updated description'
    };

    jest.spyOn(component['router'], 'url', 'get').mockReturnValue('/sessions/update/1');
    mockSessionApiService.detail.mockReturnValue(of(mockSession));
    jest.spyOn(component['route'].snapshot.paramMap, 'get').mockReturnValue('1');

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.onUpdate).toBeTruthy();
    expect(component.id).toBe('1');
    expect(mockSessionApiService.detail).toHaveBeenCalledWith('1');
    expect(component.sessionForm?.value).toEqual({
      name: 'Updated Session',
      date: '2023-01-02',
      teacher_id: 2,
      description: 'Updated description'
    })
  });
});
