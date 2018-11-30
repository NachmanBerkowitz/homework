import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';

@Component({
    selector: 'app-conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.css'],
    })
export class ConditionsComponent implements OnInit {
    constructor(private weatherService: WeatherService) {}
    conditions: any[];
    humidity;
    ngOnInit() {
        this.weatherService.weather.hasWeather().subscribe(w => {
            this.conditions = w.weather;
            this.humidity = w.main.humidity;
        });
    }
}
