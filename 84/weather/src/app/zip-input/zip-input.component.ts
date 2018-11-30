import { Component, Input } from '@angular/core';
import { WeatherService } from './../weather.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-zip-input',
    templateUrl: './zip-input.component.html',
    styleUrls: ['./zip-input.component.css'],
    })
export class ZipInputComponent {
    constructor(private weatherService: WeatherService, private router: Router) {}

    @Input()
    weatherInfo;
    zip;

    validateIsDigit(char) {
        return /[0-9]/.test(char);
    }

    validateZip(num) {
        return num.length === 5 && num.split('').every(char => this.validateIsDigit(char));
    }

    handleSubmit(event) {
        const zip = this.zip;
        if (this.validateZip(zip)) {
            this.weatherService.weather
                .setWeather(zip)
                .subscribe(
                    () => this.router.navigate([`/weather/${zip}/temperature`]),
                    () => this.router.navigate(['/weather/error']),
                );
            this.zip = '';
            event.preventDefault();
        }
    }
}
