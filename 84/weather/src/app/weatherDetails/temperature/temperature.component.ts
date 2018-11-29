import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { WeatherService} from '../../weather.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class temperatureComponent implements OnInit {

  constructor(private weatherService: WeatherService) {}

  temperature;

  ngOnInit() {
    console.count('TEMP');
  }

}
