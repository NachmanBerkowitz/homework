import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WeatherService} from './../../weather.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    })
export class NavComponent implements OnInit {
    constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

    @Input()
    locationName: string;
    happy;

    ngOnInit() {
        console.count('NAV');
        this.route.paramMap
        .pipe(
          map((params: ParamMap)=>this.weatherService.getWeather(params.get('zip')))
        )
        .subscribe(weatherPomise=>weatherPomise.then((w )=>{console.log(w);this.locationName=w.name}));
    }
}
