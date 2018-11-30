import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.css']
})
export class WindComponent implements OnInit {

  constructor(private weatherService: WeatherService) {}
  wind;
  ngOnInit() {
    this.weatherService.weather.hasWeather().subscribe(w=>this.wind=w.wind);
  }

}
