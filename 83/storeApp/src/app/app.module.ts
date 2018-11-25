import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { NewCatergoryFormComponent } from './new-catergory-form/new-catergory-form.component';
import { NewCategoryFormComponent } from './new-category-form/new-category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentDetailsComponent,
    NewItemFormComponent,
    NewCategoryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
