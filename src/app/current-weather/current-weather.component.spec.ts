import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentWeatherComponent } from './current-weather.component';
import { RouterModule, Route, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WeatherServiceService } from '../weather-service.service';
import { UserService } from '../user.service';
import { AuthGuardGuard } from '../auth-guard.guard';
import { SignInUpGuard } from '../sign-in-up.guard';
import { DebugElement } from '@angular/core';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { OneDayWeatherReportComponent } from './one-day-weather-report/one-day-weather-report.component';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser'


const appRoutes: Routes = [
  { path: 'weatherReport', component: CurrentWeatherComponent, canActivate: [AuthGuardGuard], children: [ { path: 'oneDayForecast', component: OneDayWeatherReportComponent}]},
  { path: '', component: SignInComponent},
  { path: 'signUp', component: SignUpComponent }
];

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let de: DebugElement;

  let el: HTMLElement;
  var s;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CurrentWeatherComponent,
        SignUpComponent,
        OneDayWeatherReportComponent,
        SignInComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        NgxSpinnerModule
      ],
      providers: [WeatherServiceService, UserService, AuthGuardGuard, SignInUpGuard, { provide:APP_BASE_HREF, useValue: '/'}],
    })
    .compileComponents()

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
  
  it('should create the app', ()=>{
    let fixture= TestBed.createComponent(CurrentWeatherComponent);
    let app=fixture.debugElement.componentInstance;
    expect(app).toBeTruthy;
  });

  it(`Compared the message in service is equal to message in component`, ()=>{
    let fixture = TestBed.createComponent(CurrentWeatherComponent);
    let app= fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.message).toEqual(app.user.message)
  });



  it(`should get the data from weather service currentWeather`,()=>{
    let fixture=TestBed.createComponent(CurrentWeatherComponent);
    let app= fixture.debugElement.componentInstance;
    let weatherService=fixture.debugElement.injector.get(WeatherServiceService);
    fixture.detectChanges();
    expect(weatherService.currentWeather("452522")).toBeTruthy;
  });

  it(`should get the data from weather service Search City`,()=>{
    let fixture=TestBed.createComponent(CurrentWeatherComponent);
    let app= fixture.debugElement.componentInstance;
    let weatherService=fixture.debugElement.injector.get(WeatherServiceService);
    expect(weatherService.searchCity("indore")).toBeTruthy;
  });

  it(`Service should have a log0ut functionality`,()=>{
    let fixture=TestBed.createComponent(CurrentWeatherComponent);
    let app= fixture.debugElement.componentInstance;
    let userService=fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(userService.logOut());
  });
  it(`should show input box empty when user is logged in`, ()=>{
    let fixture= TestBed.createComponent(CurrentWeatherComponent);
    let app= fixture.debugElement.componentInstance;
    app.isUserLoggedIn=true;
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').textContent).not.toContain('');
  });

  it(`should check the search city function in current weather.ts`,()=>{
    let fixture=TestBed.createComponent(CurrentWeatherComponent);
    let app= fixture.debugElement.componentInstance;
    let weatherService=fixture.debugElement.injector.get(WeatherServiceService);
    weatherService.searchCity('indore').subscribe(data=>{
      expect(data[0]['LocalizedName']).toBe('Indore')
    });
  });

  it(`should check the Current weather function in in current weather.ts`,()=>{
    let fixture=TestBed.createComponent(CurrentWeatherComponent);
    let app= fixture.debugElement.componentInstance;
    app.ws.currentWeather('204411').subscribe(data=>{
     expect(data[0]['WeatherIcon']).toEqual(6)
    });
  });

  
});
