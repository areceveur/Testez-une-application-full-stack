import { HttpClientModule } from '@angular/common/http';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DetailComponent } from './detail.component';
import { By } from "@angular/platform-browser";

import {SessionApiService} from "../../services/session-api.service";
import {of, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockSessionApiService: any;
  let mockMatSnackBar: any;
  let mockRouter: any;
  let httpTestingController: any;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  };

  const mockSessionService = {
    sessionInformation: {
      id: 1,
      name: "Yoga Session",
      description: "Session de yoga",
      date: new Date("2024-08-01"),
      teacher_id: 1,
      users: [1, 2, 3],
      createdAt: new Date("2024-07-28"),
      updatedAt: new Date("2024-07-31")
    },
    delete: jest.fn(() => of({success: true}))
  };

  beforeEach(async () => {
    mockRouter = {navigate: jest.fn()};
    mockMatSnackBar = {open: jest.fn()};

    mockSessionApiService = {
      delete: jest.fn(() => of({})),
      detail: jest.fn(() => of({
        id: 1,
        name: 'Yoga Session',
        description: 'Session de yoga',
        date: new Date("2024-08-01"),
        teacher_id: 1,
        users: [1, 2, 3],
        createdAt: new Date("2024-07-28"),
        updatedAt: new Date("2024-07-31"),
      })),
      participate: jest.fn(() => of({})),
      unParticipate: jest.fn(() => of({})),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [DetailComponent],
      providers: [
        {provide: SessionService, useValue: mockSessionService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: SessionApiService, useValue: mockSessionApiService},
        {provide: Router, useValue: mockRouter},
        {provide: MatSnackBar, useValue: mockMatSnackBar}],
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button "delete" for the admins', () => {
    component.isAdmin = true;
    component.session = mockSessionService.sessionInformation;
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));
    expect(deleteButton).toBeTruthy();
  });

  it('should show the information of the session', () => {
    component.session = mockSessionService.sessionInformation;
    component.teacher = {
      id: 1,
      firstName: "Hélène",
      lastName: "THIERCELIN",
      createdAt: new Date("2024-06-27"),
      updatedAt: new Date("2024-06-30")
    };
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sessionName = compiled.querySelector('h1')?.textContent;
    const sessionTeacher = compiled.querySelector('mat-card-subtitle')?.textContent ?? '';
    const sessionAttendees = compiled.querySelector('.att')?.textContent;
    const sessionDate = compiled.querySelector('.date')?.textContent;
    const formattedSessionDate = new Date(component.session.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const sessionDescription = compiled.querySelector('.description')?.textContent;
    const sessionCreation = compiled.querySelector('.created')?.textContent;
    const formattedSessionCreation = component.session.createdAt ? new Date(component.session.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';
    const sessionUpdate = compiled.querySelector('.updated')?.textContent;
    const formattedSessionUpdate = component.session.updatedAt ? new Date(component.session.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    expect(sessionName).toContain(component.session.name);
    if(component.teacher) {
      expect(sessionTeacher).toContain(`${component.teacher.firstName} ${component.teacher.lastName}`);
    };
    expect(sessionAttendees).toContain(`${component.session.users.length} attendees`);
    expect(sessionDate).toContain(formattedSessionDate);
    expect(sessionDescription).toContain(component.session.description);
    expect(sessionCreation).toContain(`Create at:  ${formattedSessionCreation}`);
    expect(sessionUpdate).toContain(`Last update:  ${formattedSessionUpdate}`);
  });

  it('should show the button "participate" for the attendee', () => {
    component.isParticipate = false;
    component.session = mockSessionService.sessionInformation;
    fixture.detectChanges();
    const participateButton = fixture.debugElement.query(By.css('button[color="primary"]'));
    expect(participateButton).toBeTruthy();
  });

  it('should show the button "do not participate" for the attendee', () => {
    component.isParticipate = true;
    component.session = mockSessionService.sessionInformation;
    fixture.detectChanges();
    const notParticipateButton = fixture.debugElement.query(By.css('button[color="warn"]'));
    expect(notParticipateButton).toBeTruthy();
  });

  it('should use the "back" button', () => {
    jest.spyOn(window.history, 'back');
    component.back();
    expect(window.history.back).toHaveBeenCalled();
  });

  it('should delete the user account', fakeAsync(() => {
    component.delete();
    tick();
    expect(mockSessionApiService.delete).toHaveBeenLastCalledWith('1');
    expect(mockMatSnackBar.open).toHaveBeenCalledWith("Session deleted !", "Close", {duration: 3000 });
    expect(mockRouter.navigate).toHaveBeenLastCalledWith(['sessions'])
  }));

  it('should validate the participation', () => {
    component.session = mockSessionService.sessionInformation;
    component.userId = '1';
    component.isParticipate = false;

    component.participate();

    expect(mockSessionApiService.participate).toHaveBeenCalledWith('1', '1');
    component.isParticipate = true;
    expect(component.isParticipate).toBeTruthy();
  });

  it('should invalidate the participation', () => {
    component.session = mockSessionService.sessionInformation;
    component.userId = '1';
    component.isParticipate = true;

    component.unParticipate();

    expect(mockSessionApiService.unParticipate).toHaveBeenCalledWith('1','1');
  })

  it('should fetch and update session and teacher information', fakeAsync(() => {
    component.ngOnInit();
    tick();

    const teacherReq: TestRequest = httpTestingController.expectOne('api/teacher/1');
    expect(teacherReq.request.method).toBe('GET');
    teacherReq.flush({
      id: 1,
      firstName: "Hélène",
      lastName: "THIERCELIN",
      createdAt: new Date("2024-06-27"),
      updatedAt: new Date("2024-06-30")
    });

    fixture.detectChanges();

    expect(component.session).toEqual(mockSessionService.sessionInformation);
    expect(component.teacher).toEqual({
      id: 1,
      firstName: "Hélène",
      lastName: "THIERCELIN",
      createdAt: new Date("2024-06-27"),
      updatedAt: new Date("2024-06-30")
    });
    expect(component.isParticipate).toBe(true);
  }));
});

