import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';
import { Session } from '../../interfaces/session.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DetailComponent } from './detail.component';
import {By} from "@angular/platform-browser";
import mock = jest.mock;

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;

  const mockSessionService = {
    sessionInformation: {
      id: 1,
      name: "Yoga Session",
      description: "Session de yoga",
      date: new Date("2024-08-01"),
      teacher_id: 1,
      users: [1,2,3],
      createdAt: new Date("2024-07-28"),
      updatedAt: new Date("2024-07-31")
    },
    Teacher: {
      id: 1,
      firstName: "Hélène",
      lastName: "THIERCELIN",
      createdAt: new Date("2024-06-27"),
      updatedAt: new Date("2024-06-30")
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
      ],
      declarations: [DetailComponent],
      providers: [
        { provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();
    service = TestBed.inject(SessionService);
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
    component.teacher = mockSessionService.Teacher;
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const sessionName = compiled.querySelector('h1')?.textContent;
    const sessionTeacher = compiled.querySelector('mat-card-subtitle')?.textContent;
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
    expect(sessionTeacher).toContain(`${component.teacher.firstName} ${component.teacher.lastName}`);
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
});

