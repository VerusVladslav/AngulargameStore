import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Admin-area',
  templateUrl: './Admin-area.component.html',
  styleUrls: ['./Admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  constructor() { }
  isCollapsed = false;
  ngOnInit() {
  }

}
