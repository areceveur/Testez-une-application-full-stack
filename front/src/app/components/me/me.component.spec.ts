import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { expect } from '@jest/globals';

import { MeComponent } from './me.component';
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user.interface";

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userService: UserService;
  let matSnackBar: MatSnackBar;
  let router: Router;
  let sessionService: SessionService;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1,
      firstName: "Admin",
      lastName: "ADMIN",
      email: "yoga@studio.com",
      password: '',
      createdAt: new Date("2024-06-30"),
      updatedAt: new Date("2024-06-30")
    },
    sessionInformationWithoutAdmin: {
      admin: false,
      id: 1,
      firstName: "Admin",
      lastName: "ADMIN",
      email: "yoga@studio.com",
      password: '',
      createdAt: new Date("2024-06-30"),
      updatedAt: new Date("2024-06-30")
    },
    logOut: jest.fn()
  };

  const mockUserService = {
    getById: jest.fn(() => of({
      id: 1,
      email: "user@test.com",
      firstName: "Test",
      lastName: "USER",
      admin: false,
      password: '',
      createdAt: new Date("2024-08-02"),
      updatedAt: new Date("2024-08-03")} as User)),
    delete: jest.fn(() => of({ success: true }))
  };

  const mockMatSnackBar = {
    open: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    matSnackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    sessionService = TestBed.inject(SessionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the information of the user', () => {
    component.user = mockSessionService.sessionInformation;
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const userName = compiled.querySelector('.name')?.textContent;
    const userEmail = compiled.querySelector('.email')?.textContent;
    const userCreation = compiled.querySelector('.creation')?.textContent;
    const formattedSessionCreation = component.user.createdAt ? new Date(component.user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';
    const userUpdate = compiled.querySelector('.update')?.textContent;
    const formattedSessionUpdate = component.user.updatedAt ? new Date(component.user.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    expect(userName).toContain(`Name: ${component.user.firstName} ${component.user.lastName.toUpperCase()}`);
    expect(userEmail).toContain(`${component.user.email}`);
    expect(userCreation).toContain(`Create at:  ${formattedSessionCreation}`);
    expect(userUpdate).toContain(`Last update:  ${formattedSessionUpdate}`);
  });

  it('should display "You are admin" for the admin', () => {
    component.user = mockSessionService.sessionInformation;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const userAdmin = compiled.querySelector('.my2')?.textContent;
    const userButton = fixture.debugElement.query(By.css('button[color="warn"]'));

    expect(userAdmin).toContain("You are admin");
    expect(userButton).toBeNull();
  });

  it('should display the "Delete my account" button if the user is not admin', () => {
    component.user = mockSessionService.sessionInformationWithoutAdmin;
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));

    expect(deleteButton).not.toBeNull();
  });

  it('should delete the user account', () => {
    jest.spyOn(userService, 'delete').mockReturnValue(of({}));
    jest.spyOn(router, 'navigate');
    jest.spyOn(sessionService, 'logOut');

    component.delete();

    expect(userService.delete).toHaveBeenCalledWith('1');
    expect(matSnackBar.open).toHaveBeenCalledWith("Your account has been deleted !", 'Close', { duration: 3000 });
    expect(sessionService.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should use the button back', () => {
    jest.spyOn(window.history, 'back');
    component.back();
    expect(window.history.back).toHaveBeenCalled();
  })

});
