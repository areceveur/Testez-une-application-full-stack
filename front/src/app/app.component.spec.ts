import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import {of} from "rxjs";
import {Router} from "@angular/router";
import {SessionService} from "./services/session.service";


describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let sessionServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    sessionServiceMock = {
      $isLogged: jest.fn(),
      logOut: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should update $isLogged observable', () => {
    const mockIsLogged = true;

    sessionServiceMock.$isLogged.mockReturnValue(of(mockIsLogged));

    app.$isLogged().subscribe(isLogged => {
      expect(isLogged).toBe(mockIsLogged);
    })
  });

  it('should log out the user', () => {
    app.logout();
    expect(sessionServiceMock.logOut).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith([''])
  })

});
