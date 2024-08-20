import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { expect } from '@jest/globals';

import { MeComponent } from './me.component';
import {By} from "@angular/platform-browser";

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

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
    }
  }

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
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
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

    expect(userName).toContain(`${component.user.firstName} ${component.user.lastName}`);
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


});
