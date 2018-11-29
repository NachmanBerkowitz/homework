import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZipInputComponent } from './zip-input/zip-input.component';
import { NavComponent } from './weatherDetails/nav/nav.component';
import { BaseRouteComponent } from './base-route/base-route.component';
import { WeatherModule } from './weatherDetails/weather.module';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ZipInputComponent,
    NavComponent,
    BaseRouteComponent,
    ErrorMessageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WeatherModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
