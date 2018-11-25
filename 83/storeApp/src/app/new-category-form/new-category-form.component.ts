import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-new-category-form',
  templateUrl: './new-category-form.component.html',
  styleUrls: ['./new-category-form.component.css']
})
export class NewCategoryFormComponent{

  @Input()
  addACategory
  @Input()
  toggleAddCategory

  onAddCategory(name:string,event){
    // event.preventDefault();
    this.addACategory(name);
    this.toggleAddCategory();
  }
}
