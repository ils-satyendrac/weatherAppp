import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { StorageServiceModule } from 'angular-webstorage-service';


import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from '../../current-weather/current-weather.component';
import { AuthGuardGuard } from '../../auth-guard.guard';
import { OneDayWeatherReportComponent } from '../../current-weather/one-day-weather-report/one-day-weather-report.component';
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from '../../user.service';
import { WeatherServiceService } from '../../weather-service.service';
import { SignInUpGuard } from '../../sign-in-up.guard';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'weatherReport', component: CurrentWeatherComponent, canActivate: [AuthGuardGuard], children: [ { path: 'oneDayForecast', component: OneDayWeatherReportComponent}]},
  { path: '', component: SignInComponent},
  { path: 'signUp', component: SignUpComponent }
];
describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let de: DebugElement;

  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent,
        CurrentWeatherComponent, 
        SignInComponent, 
        SignUpComponent,
      OneDayWeatherReportComponent
     ],
      imports: [
        ReactiveFormsModule,
        StorageServiceModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
      ],
      providers: [
        WeatherServiceService, UserService, AuthGuardGuard, SignInUpGuard, { provide:APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(SignInComponent);
      component=fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('form'));
      el= de.nativeElement;
    });
  }));

  it(`Form should be invalid`, async(()=>{
    component.signIn.controls['email'].setValue('');
    component.signIn.controls['password'].setValue('');
    expect(component.signIn.valid).toBeFalsy();
  }));

  it(`Form should be valid`, async(()=>{
    component.signIn.controls['email'].setValue('s@d');
    component.signIn.controls['password'].setValue('wqswqsw');
    expect(component.signIn.valid).toBeTruthy();
  }));

  it(`should return false logged in status initially`,()=>{
    let fixture=TestBed.createComponent(SignInComponent);
    let app= fixture.debugElement.componentInstance;
    let userService=fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    let compiled=fixture.debugElement.nativeElement;
    expect(userService.isUserLoggedIn).toBe(false);
  });

  it(`To check the status of logged in in service and component`,()=>{
    let fixture=TestBed.createComponent(SignInComponent);
    let app= fixture.debugElement.componentInstance;
    let userService=fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    let compiled=fixture.debugElement.nativeElement;
    expect(userService.setUserLoggedIn()).toEqual(app.setUserLoggedIn);
  });
  
});
