import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { temperatureComponent } from './temperature/temperature.component';
import { WindComponent } from './wind/wind.component';
import { ConditionsComponent } from './conditions/conditions.component';

@NgModule({
  declarations: [
    WindComponent,
    temperatureComponent,
    ConditionsComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
