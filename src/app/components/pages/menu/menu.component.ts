import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: any = [
    {"round":1,"speaker": 'John Doe'},
    {"round":2,"speaker": 'Jane Doe'},
    {"round":3,"speaker": 'Sue Smith'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
