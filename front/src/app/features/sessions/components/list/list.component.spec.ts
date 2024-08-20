import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { Session } from '../../interfaces/session.interface';

import { ListComponent } from './list.component';
import {of} from "rxjs";
import {SessionApiService} from "../../services/session-api.service";
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let sessionApiServiceMock: any;
  let sessionServiceMock: any;

  const mockSessionService = {
    sessionInformation: {
      token: 'mock-token',
      type: 'mock-token',
      id: 1,
      username: 'User',
      firstName: 'User',
      lastName: 'Test',
      email: 'user@example.com',
      admin: true
    },
    isLogged: true,
    $isLogged: jest.fn().mockReturnValue(of(true)),
    logIn: jest.fn(),
    logOut: jest.fn(),
  }

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1' // you can return whatever mock value you need here
      }
    }
  };

  beforeEach(async () => {
    sessionApiServiceMock = {
      all: jest.fn().mockReturnValue(of([
        {
          id: 1,
          name: 'Session 1',
          description: 'Description 1',
          date: new Date(),
          teacher_id: 1,
          users: [1, 2],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Session 2',
          description: 'Description 2',
          date: new Date(),
          teacher_id: 2,
          users: [3, 4],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]))
    };

    sessionServiceMock = {
      sessionInformation: {
        token: 'mock-token',
        type: 'mock-token',
        id: 1,
        username: 'User',
        firstName: 'User',
        lastName: 'Test',
        email: 'user@example.com',
        admin: true
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatCardModule, MatIconModule, RouterModule],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: sessionApiServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sessions on initialization', () => {
    component.sessions$.subscribe(sessions => {
      expect(sessions.length).toBe(2);
      expect(sessions[0].name).toBe('Session 1');
      expect(sessions[1].name).toBe('Session 2');
    });
  });

  it('should display the button "create" for the admins', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const createButton = compiled.querySelector('button[routerLink="create"]');
    expect(createButton).toBeTruthy();
  });

  it('should display the button "detail" for the admins', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const detailButton = compiled.querySelectorAll('button[routerLink^="detail"]');
    expect(detailButton).toBeTruthy();
  })

});
