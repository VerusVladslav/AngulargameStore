import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Game } from 'src/app/Models/game.model';
import { Order } from 'src/app/Models/Order.model';
import { OrderList } from 'src/app/Models/orderlist.model';
import { GameService } from 'src/app/Services/game.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-OrderList',
  templateUrl: './OrderList.component.html',
  styleUrls: ['./OrderList.component.css']
})
export class OrderListComponent implements OnInit {

  Orderdto: Order[] = [];

  listOfColumn = [

    {
      title: 'User name',
    },
    {
      title: '',
    },

    {
      title: 'Game',
    },
    {
      title: '',
    }
  ];

    constructor(private userService: UserService,
      private gameService: GameService,
      private notifier: NotifierService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.GetOrderList().subscribe(Data => {
      this.Orderdto = Data;
        console.log(Data);

    this.spinner.hide();
  });
  }
  AcceptOrder(id: number) {
    this.spinner.show();
    this.userService.acceptOrder(id).subscribe(Data => {
      if (Data.status === 200) {
        this.notifier.notify('success', 'Game Accepted !');
        this.ngOnInit();
      } else {
        for (let i = 0; i < Data.errors.length; i++) {
          this.notifier.notify('error', Data.errors[i]);
        }
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }

}
