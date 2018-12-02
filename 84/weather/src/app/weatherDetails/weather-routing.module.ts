import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { temperatureComponent } from './temperature/temperature.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { WindComponent } from './wind/wind.component';
import { ConditionsComponent } from './conditions/conditions.component';

const routes: Routes = [
    { path: 'weather/error', component: ErrorMessageComponent },
    {
        path: 'weather/:zip',
        component: NavComponent,
        children: [
            { path: 'temperature', component: temperatureComponent },
            { path: 'conditions', component: ConditionsComponent },
            { path: 'wind', component: WindComponent }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    })
export class WeatherRoutingModule {}
