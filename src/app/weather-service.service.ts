import { Injectable } from '@angular/core';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http: HttpClient) { }

  cityTransfer="";
  city="";
  apiKey= "rbzZvRPWmj8Q4crKaYDydwD3tFxYjcc0";
  apiUrlCurrent;
  apiUrlCitySearch;
  historicDataUrl;
  autocompleteDataUrl;

  currentWeather(code:string)
  {
    this.apiUrlCurrent="http://dataservice.accuweather.com/currentconditions/v1/"+code;
    const params =new HttpParams().set('apikey', this.apiKey);
    return this.http.get(this.apiUrlCurrent,{params});  
  }

  searchCity(city)
  {
    this.cityTransfer=city;
    this.apiUrlCitySearch=" http://dataservice.accuweather.com/locations/v1/cities/search";
    const params =new HttpParams().set('apikey', this.apiKey).set('q', city);
    return this.http.get(this.apiUrlCitySearch,{params});
  }

  historicWeatherData(code:string)
  {
    this.historicDataUrl="http://dataservice.accuweather.com/currentconditions/v1/"+code+"/historical/24";
    const params =new HttpParams().set('apikey', this.apiKey);
    return this.http.get(this.historicDataUrl,{params});
  }

  // recentWeatherData(citySearch: string)
  // {
  //   this.autocompleteDataUrl="http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
  //   const params =new HttpParams().set('apikey', this.apiKey).set('q', citySearch);
  //   return this.http.get(this.autocompleteDataUrl,{params});
  // }
}
