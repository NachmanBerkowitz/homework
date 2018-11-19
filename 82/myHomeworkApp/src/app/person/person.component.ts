import { Component, Input } from '@angular/core';
import {Person,Address} from './../app.component'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  @Input()
  person: Person;

  

}

