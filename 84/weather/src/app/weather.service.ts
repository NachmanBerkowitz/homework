import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ConnectableObservable, iif } from 'rxjs';
import { publishReplay } from 'rxjs/operators';

export interface Weather {
    name: string;
    main: { humidity: string };
    weather: any[];
    wind: object;
}

@Injectable({
    providedIn: 'root',
    })
export class WeatherService {
    constructor(private httpClient: HttpClient) {}

    weather = (function(httpClnt: HttpClient) {
        let zip: string;
        let weatherInfo;
        let weatherChanged: Function;
        let weatherFetchError: Function;
        let gotWeather = [];
        const setWeatherInfo = () => {
            weatherChanged();
            gotWeather.forEach(func => func());
            gotWeather = [];
        };
        const fetchWeather = (z)=> {
            httpClnt
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?zip=${z}&APPID=faee83170cf031bea8f21d2ec064e4d7&units=imperial`,
                )
                .subscribe(w => {
                    weatherInfo = w;
                    setWeatherInfo();
                },e=>weatherFetchError(e))
        };
        const weatherObs = ()=>{
            return Observable.create(obs => {
            if (weatherInfo) {
                obs.next(weatherInfo);
            }
            weatherChanged = () => {
                obs.next(weatherInfo);
            };
            weatherFetchError=(e)=>{
                console.log(e);
                obs.error(e);
            }
        })
    };

        return {
            hasWeather: function(): Observable<Weather> {
                return Observable.create(obs => {
                    if (weatherInfo) {
                        obs.next(weatherInfo);
                        obs.complete();
                    } else {
                        gotWeather.push(() => {
                            obs.next(weatherInfo);
                            obs.complete();
                        });
                    }
                });
            },
            getWeatherObs: (z?): Observable<Weather> => {
                if (z && (z !== zip || !this.weatherInfo)) {
                    fetchWeather(z);
                }
                return weatherObs();
            },
            
        };
    })(this.httpClient);
}
