import { Component, Input } from '@angular/core';
import { Address } from '../app.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent{

  @Input()
  address: Address;

}
