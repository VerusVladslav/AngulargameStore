import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { GameService } from '../Services/game.service';
import { UserService } from '../Services/user.service';

import { Game } from '../Models/game.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Client-area',
  templateUrl: './Client-area.component.html',
  styleUrls: ['./Client-area.component.css']
})
export class ClientAreaComponent implements OnInit {


  constructor() { }



  ngOnInit() {


}
}
