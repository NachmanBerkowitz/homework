import { Component } from '@angular/core';

export interface Address{
  street:string;
  city:string;
  zip:string;
}
export interface Person {
  firstName: string;
  lastName: string;
  address:Address;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Great FirstAngularApp';

  theAddress: Address={
    city:'Brookly',
    street:'34 Ave.',
    zip:'009998'
  }
  thePerson: Person = {
    firstName: 'Donald',
    lastName: 'Trump',
    address:this.theAddress
  };
}

