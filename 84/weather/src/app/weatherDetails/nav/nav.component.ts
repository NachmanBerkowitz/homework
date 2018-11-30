import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WeatherService} from './../../weather.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    })
export class NavComponent implements OnInit {
    constructor(private route: ActivatedRoute, private weatherService: WeatherService,private router: Router) {}

    @Input()
    locationName: string;
    happy;

    ngOnInit() {
        console.count('NAV');
        this.route.paramMap
        .pipe(
          switchMap((params: ParamMap)=>this.weatherService.weather.getWeatherObs(params.get('zip')))
        )
        .subscribe((w )=>{console.log(w);this.locationName=w.name},
        () => this.router.navigate(['/weather/error']));
    }
}
