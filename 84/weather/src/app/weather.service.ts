import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ConnectableObservable } from 'rxjs';
import { publishReplay } from 'rxjs/operators';

export interface Weather {
    name: string;
    main:object
}

@Injectable({
    providedIn: 'root',
    })
export class WeatherService {
    constructor(private httpClient: HttpClient) {}

    zip: string;

    weatherInfo: Weather;
    // weatherObserver: ConnectableObservable<any>;

    getWeather(zip?): Promise<Weather> {
        return new Promise((resolve, reject) => {
            if (zip && (this.zip !== zip || !this.weatherInfo)) {
                console.log('FETCHING', zip);
                this.httpClient
                    .get<Weather>(
                    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=faee83170cf031bea8f21d2ec064e4d7&units=imperial`,
                )
                    .subscribe(
                        w => {
                            console.log(w);
                            this.weatherInfo = w as Weather;
                            resolve(this.weatherInfo);
                        },
                        err => {
                            reject(err);
                        },
                    );
            } else {
                if (this.weatherInfo) {
                    resolve(this.weatherInfo);
                }else(reject('no weather info found'))
            }
        });
    }
    // getWeather(zip) {
    //   if(this.zip!==zip){
    //       console.log('FETCHING',zip)
    //     this.zip=zip;
    //     // this.weatherObserver=
    //     this.httpClient.get(
    //         `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=faee83170cf031bea8f21d2ec064e4d7&units=imperial`,
    //     ).subscribe(w=>this.weatherInfo=w);
    //     // .pipe(publishReplay()) as ConnectableObservable<any>;
    //     // this.weatherObserver.connect();
    //   }
    // //   this.weatherObserver.subscribe(w=>console.log(w));
    // //   return this.weatherObserver;
    // return this.weatherInfo;
    // }
}
