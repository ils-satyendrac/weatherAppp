import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageServiceModule } from 'angular-webstorage-service';

import { SignUpComponent } from './sign-up.component';
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from '../../current-weather/current-weather.component';
import { AuthGuardGuard } from '../../auth-guard.guard';
import { SignInComponent } from '../sign-in/sign-in.component';
import { OneDayWeatherReportComponent } from '../../current-weather/one-day-weather-report/one-day-weather-report.component';
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from '../../user.service';
import { WeatherServiceService } from '../../weather-service.service';
import { SignInUpGuard } from '../../sign-in-up.guard';

const appRoutes: Routes = [
  { path: 'weatherReport', component: CurrentWeatherComponent, canActivate: [AuthGuardGuard], children: [ { path: 'oneDayForecast', component: OneDayWeatherReportComponent}]},
  { path: '', component: SignInComponent},
  { path: 'signUp', component: SignUpComponent }
];

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let de: DebugElement;

  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      SignUpComponent,
      CurrentWeatherComponent,
      OneDayWeatherReportComponent,
      SignInComponent
  ],
      imports: [
        ReactiveFormsModule,
        StorageServiceModule,
        RouterModule.forRoot(appRoutes)
      ],
      providers: [
        WeatherServiceService, UserService, AuthGuardGuard, SignInUpGuard, { provide:APP_BASE_HREF, useValue: '/'}
      ]

    }).compileComponents().then(()=>{
      fixture=TestBed.createComponent(SignUpComponent);
      component=fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('form'));
      el= de.nativeElement;
    });
  }));

 

  it(`Form should be invalid`, async(()=>{
    component.signUp.controls['firstName'].setValue('');
    component.signUp.controls['lastName'].setValue('');
    component.signUp.controls['email'].setValue('');
    component.signUp.controls['password'].setValue('');
    expect(component.signUp.valid).toBeFalsy();
  }));

  it(`Form should be valid`, async(()=>{
    component.signUp.controls['firstName'].setValue('swdw');
    component.signUp.controls['lastName'].setValue('wqswqsw');
    component.signUp.controls['email'].setValue('s@d.com');
    component.signUp.controls['password'].setValue('ewdedew');
    expect(component.signUp.valid).toBeTruthy();
  }));
 
});
