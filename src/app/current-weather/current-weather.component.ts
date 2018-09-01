import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HistoricData } from '../historic-data';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AutoComplete } from '../auto-complete';
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  date;
  celcius;
  weatherData;
  weatherCity;
  city;
  temperature;
  image;
  kind;
  time;
  inputForm: FormGroup;
  searches=[];
  recentSearches: HistoricData[]=[];
  localStorageArray;
  autoCompleteData;
  j=0;
  count=0;



  constructor(public ws:WeatherServiceService, public user:UserService, private router: Router, private spinner: NgxSpinnerService) {
    this.localStorageArray=JSON.parse(localStorage.getItem('i'))
   }

  ngOnInit() {

    this.inputForm = new FormGroup({
      'cityInput': new  FormControl(null,Validators.required)
    });
    
  }



  onSubmit()
  {
    this.ws.searchCity(this.inputForm.value['cityInput']).subscribe((data1)=> 
    {
      this.weatherCity = data1;
      this.ws.currentWeather(this.weatherCity[0]['Key']).subscribe((data)=> 
      {
        this.weatherData = data;
        this.date="Date: ";
        this.celcius= "° C";
        this.city=this.weatherCity[0]['LocalizedName']
        this.temperature=this.weatherData[0]['Temperature']['Metric']['Value'];
        this.image=this.weatherData[0]['WeatherIcon']
        this.kind=this.weatherData[0]['WeatherText']
        this.time=this.weatherData[0]['LocalObservationDateTime']

        this.recent();
        this.counter();
        this.inputForm.reset();
      });
    });
    return this.inputForm;
  }
  
  recent()
  {
    var use=1;
    if(this.recentSearches.length==0)
    {
      const temp= new HistoricData(
        this.weatherCity[0]['LocalizedName'],
        this.weatherData[0]['Temperature']['Metric']['Value'],
        this.weatherData[0]['WeatherIcon'],
        this.weatherData[0]['WeatherText'],
        this.weatherData[0]['LocalObservationDateTime']
      )
      this.recentSearches.push(temp);
      localStorage.setItem('i',JSON.stringify(this.recentSearches));
      this.localStorageArray=JSON.parse(localStorage.getItem('i'))
    }
    else
    {
      for(let i=0;i<this.localStorageArray.length;i++)
      {
        if(this.inputForm.value['cityInput'].toUpperCase()==this.localStorageArray[i]['city'].toUpperCase())
        {
          console.log(this.localStorageArray.length)
          use=0;
          break;
        }
      }
        if(use==1)
        {
          const temp= new HistoricData(
            this.weatherCity[0]['LocalizedName'],
            this.weatherData[0]['Temperature']['Metric']['Value'],
            this.weatherData[0]['WeatherIcon'],
            this.weatherData[0]['WeatherText'],
            this.weatherData[0]['LocalObservationDateTime']
          )
          this.recentSearches.push(temp)
          localStorage.setItem('i',JSON.stringify(this.recentSearches));
          this.localStorageArray=JSON.parse(localStorage.getItem('i'))
        }
    }
    
    
  }
  onClick(temp)
  {
   this.city=temp['city'];
   this.temperature=temp['temperature'];
   this.image=temp['image'];
   this.kind=temp['kind'];
   this.time=temp['time'];
  }

  counter()
  {
    if(this.count==5)
    {
      this.user.logOut();
      this.router.navigate(['/']);
    }
    this.count++;
  }

  onChange()
  {
    this.router.navigate(['/weatherReport/oneDayForecast'])
  }



}
