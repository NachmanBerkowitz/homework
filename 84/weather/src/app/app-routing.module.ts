import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseRouteComponent} from './base-route/base-route.component';
import {NavComponent} from './weatherDetails/nav/nav.component'
import { ErrorMessageComponent } from './error-message/error-message.component';

const routes: Routes = [
  {path:'weather',component:BaseRouteComponent},
  { path: '',   redirectTo: '/weather', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }