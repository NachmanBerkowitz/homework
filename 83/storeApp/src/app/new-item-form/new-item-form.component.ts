import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css']
})
export class NewItemFormComponent{

  @Input()
  items
  @Input()
  addItem

  name:string;
  discription:string;
  price:string;

  onSubmit(){
    this.items.push({name:this.name,discription:this.discription,price:this.price});
    this.addItem.show=false;
  }
}
