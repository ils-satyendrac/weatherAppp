import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../../weather-service.service';
import { Chart } from 'Chart.js';


@Component({
  selector: 'app-one-day-weather-report',
  templateUrl: './one-day-weather-report.component.html',
  styleUrls: ['./one-day-weather-report.component.css']
})
export class OneDayWeatherReportComponent implements OnInit {

  weatherData;
  weatherCity;
 
  temperature=[];
  time=[];

  myChart=[];


  constructor(private ws:WeatherServiceService) { }

  ngOnInit() 
  {
    this.ws.searchCity(this.ws.cityTransfer).subscribe((data1)=> 
    {
      this.weatherCity = data1;

      this.ws.historicWeatherData(this.weatherCity[0]['Key']).subscribe((data)=> 
      {
        this.weatherData = data;
          for(let i=0;i<24;i++)
          {
            const temp = this.weatherData[i]['Temperature']['Metric']['Value'];
            this.temperature.push(temp)

            const temp1 = this.weatherData[i]['LocalObservationDateTime']
            var d=new Date(temp1)
            var utc = d.getDate()+'/'+d.getMonth().toString()+'/'+d.getFullYear();
            this.time.push(utc);

          }

        var ctx = document.getElementById("myChart")
        this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.time,
            datasets: [{
                label: this.ws.cityTransfer,
                data:this.temperature,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
        });
        });

  }



}
