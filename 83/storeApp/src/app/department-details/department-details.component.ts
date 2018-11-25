import { Component, Input } from '@angular/core';
import {Item} from './../../../mock-data'

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent{
  
  @Input()
  items;
  @Input()
  index;

  addItem={show:false};
  // setAddItem(){
  //   this.addItem.show=false;
  // }
  deleteItem(item:Item){
    this.items.splice(this.items.indexOf(itm=>itm===item),1)
  }
 

}
