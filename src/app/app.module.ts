import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { OneDayWeatherReportComponent } from './current-weather/one-day-weather-report/one-day-weather-report.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherServiceService } from './weather-service.service';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserService } from './user.service';
import { AuthGuardGuard } from './auth-guard.guard';
import { SignInUpGuard } from './sign-in-up.guard';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
  { path: 'weatherReport', component: CurrentWeatherComponent, canActivate: [AuthGuardGuard], children: [ { path: 'oneDayForecast', component: OneDayWeatherReportComponent}]},
  { path: '', component: SignInComponent},
  { path: 'signUp', component: SignUpComponent }
];


@NgModule({

  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    OneDayWeatherReportComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: "weatherRepo"}),
    StorageServiceModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,

  ],
  providers: [WeatherServiceService, UserService, AuthGuardGuard, SignInUpGuard, { provide:APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
