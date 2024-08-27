import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in the user', () => {
    const sessionInfo = {
      token: '',
      type: 'Bearer',
      id: 1,
      username: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      admin: false
    };
    service.logIn(sessionInfo);

    expect(service.sessionInformation).toEqual(sessionInfo);
    expect(service.isLogged).toBe(true);
  });

  it('should log out the user', () => {
    const sessionInfo = {
      token: '',
      type: 'Bearer',
      id: 1,
      username: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      admin: false
    };
    service.logIn(sessionInfo);
    service.logOut();

    expect(service.sessionInformation).toBeUndefined();
    expect(service.isLogged).toBe(false);
  });

  it('should update $isLogged observable when logging in and out', (done) => {
    let loggedStates: boolean[] = [];

    service.$isLogged().subscribe((isLogged) => {
      loggedStates.push(isLogged);

      if (loggedStates.length === 3) {
        expect(loggedStates).toEqual([false, true, false]);
        done();
      }
    });

    service.logIn({
      token: '',
      type: 'Bearer',
      id: 1,
      username: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      admin: false
    });
    service.logOut();
  });
});
