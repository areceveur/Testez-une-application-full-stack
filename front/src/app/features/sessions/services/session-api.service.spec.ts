import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { Session } from "../interfaces/session.interface";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";

describe('SessionsService', () => {
  let service: SessionApiService;
  let httpMock: HttpTestingController;

  const mockSessionService: Session[] = [
    {
      id: 1,
      name: 'Yoga session',
      description: 'Session de yoga',
      date: new Date("2024-08-18"),
      teacher_id: 1,
      users: [1,2,3],
      createdAt: new Date("2024-08-02"),
      updatedAt: new Date("2024-08-04")
    },
    {
      id: 2,
      name: 'Yoga session',
      description: 'Session de yoga',
      date: new Date("2024-08-20"),
      teacher_id: 2,
      users: [2,3,4],
      createdAt: new Date("2024-08-02"),
      updatedAt: new Date("2024-08-04")
    }
  ];

  const mockSessionParticipation = {
    id: '1',
    userId: '2'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SessionApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show all sessions', () => {
    service.all().subscribe((sessions: Session[]) => {
      expect(sessions.length).toBe(2);
      expect(sessions).toEqual(mockSessionService);
    });
    const req = httpMock.expectOne(service['pathService']);
    expect(req.request.method).toBe('GET');

    req.flush(mockSessionService);
  });

  it('should show one session', () => {
    const sessionId = '1';

    service.detail(sessionId).subscribe((session: Session) => {
      expect(session).toEqual(mockSessionService[0]);
    });
    const req = httpMock.expectOne(`${service['pathService']}/${sessionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSessionService[0]);
  });

  it('should display the "delete" button', () => {
    const sessionId = '1';
    service.delete(sessionId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['pathService']}/${sessionId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should show the button "participate" for the attendee', () => {
    service.participate(mockSessionParticipation.id, mockSessionParticipation.userId).subscribe((response) => {
      expect(response).toBeTruthy();
    })
    const req = httpMock.expectOne(`${service['pathService']}/${mockSessionParticipation.id}/participate/${mockSessionParticipation.userId}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSessionParticipation);
  });

  it('should show the button "unparticipate" for the attendee', () => {
    service.unParticipate(mockSessionParticipation.id, mockSessionParticipation.userId).subscribe((response) => {
      expect(response).toBeTruthy();
    })
    const req = httpMock.expectOne(`${service['pathService']}/${mockSessionParticipation.id}/participate/${mockSessionParticipation.userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockSessionParticipation);
  });

  it('should create a session', () => {
    service.create(mockSessionService[0]).subscribe((session: Session) => {
      expect(session).toEqual(mockSessionService[0]);
    });
    const req = httpMock.expectOne(`${service['pathService']}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockSessionService[0]);
    req.flush(mockSessionService[0]);
  });

  it('should update a session', () => {
    const updatedSession = { ...mockSessionService[0], name: 'Updated Yoga session'};
    service.update(updatedSession.id?.toString() ?? '', updatedSession).subscribe((session: Session) => {
      expect(session).toEqual(updatedSession);
    });
    const req = httpMock.expectOne(`${service['pathService']}/${updatedSession.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSession);
    req.flush(updatedSession);
  });
});
