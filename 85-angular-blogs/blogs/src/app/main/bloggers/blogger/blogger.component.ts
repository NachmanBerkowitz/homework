import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrls: ['./blogger.component.css']
})
export class BloggerComponent implements OnInit {

  constructor() { }
  @Input()
  blogger

  ngOnInit() {
    
  }

}
