import { Component } from '@angular/core';
import {mockData,Department,Item} from './../../mock-data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mockData=mockData;
  selectedDepartmentIndex='Choose...';
  selectedDepartment:Department;
  addCategory:boolean=false;
  getDepartmentByIndex(int:number):Department{
    return mockData[int];
  }
  getItemsByDepartmentIndex(int:number):Item[]{
    return this.getDepartmentByIndex(int).items;
  }
  selectDepartment(int:number):void{
    this.selectedDepartment=this.getDepartmentByIndex(int);
  }
  toggleAddCategory=()=>{
    this.addCategory=!this.addCategory;
  }
  addACategory(name:string){
    mockData.push({department: { category: name },items:[]})
  }
}
