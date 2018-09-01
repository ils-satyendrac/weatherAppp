import { TestBed, inject } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import { WeatherServiceService } from './weather-service.service';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule
        ],
      providers: [WeatherServiceService]
    });
  });

  var s ;
  beforeAll(inject([WeatherServiceService], (service: WeatherServiceService) => {
    s = service;
  }));

  beforeAll((done)=>{
    s.currentWeather('204411').subscribe(data=>{
        s.city = data;
        done();
    })
  });

  beforeAll((done)=>{
    s.searchCity('indore').subscribe(data=>{
        s.city = data;
        done();
    })
  });
  
  beforeAll((done)=>{
    s.historicWeatherData('204411').subscribe(data=>{
        s.city = data;
        done();
    })
  });




  it('should be created', inject([WeatherServiceService], (service: WeatherServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('current weather', ()=>{
    expect(s.city).not.toBe('');
  });
  
  it('Search city', ()=>{
    expect(s.city).not.toBe('');
  });
  it('historic weather data', ()=>{
    expect(s.city).not.toBe('');
  });
});
