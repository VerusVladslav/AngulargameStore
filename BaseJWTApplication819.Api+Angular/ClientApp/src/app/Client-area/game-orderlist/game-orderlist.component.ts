import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Game } from 'src/app/Models/game.model';
import { GameService } from 'src/app/Services/game.service';
import { UserService } from 'src/app/Services/user.service';
import jwt_decode from 'jwt-decode';
import { ClientOrder } from 'src/app/Models/ClientGame.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-game-orderlist',
  templateUrl: './game-orderlist.component.html',
  styleUrls: ['./game-orderlist.component.css']
})
export class GameOrderlistComponent implements OnInit {

  constructor(private gameService: GameService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router,
    private user: UserService,
    private modalService: NzModalService,
    private i18n: NzI18nService) { }


    listOfData: Game[] = [];
    orderList: Game [] = [];
    ClientList: ClientOrder [] = [];
    isVisible = false;
    Key: any;
    countElement: number;


    success(id: number): void {
      this.user.getGeameKey(id).subscribe(data => {
        this.Key = data.message;
          console.log(data);
          const modal = this.modalService.success({
            nzTitle: this.Key,
            nzContent: 'This modal will be destroyed after 5 second'
          });

          setTimeout(() => modal.destroy(), 5000);
        });

    }

  ngOnInit() {
    this.i18n.setLocale(en_US);


this.spinner.show();
this.ClientList = [];
const token = window.localStorage.getItem('token');
const decoded = jwt_decode(token);


  this.user.GetCurentOrders(decoded.id, 1).subscribe(
    Data => {
    this.orderList = Data;
    this.orderList.forEach(element => {
     this.user.ifGameAccept(decoded.id, element.id).subscribe(isAccep => {
      const isAccept = isAccep;
      console.log(isAccept);
      this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
        element.year, element.genre, element.developer, true, isAccept));

    });

    this.user.GetOrderCountPages(decoded.id).subscribe(page => {
      this.countElement = page.status;
      console.log(this.countElement);
    });
  });

  // console.log(this.listOfData);
  this.spinner.hide();
});

  }

  removeFromOrder(id: number) {
    this.spinner.show();
    const token = window.localStorage.getItem('token');
    const decoded = jwt_decode(token);
    this.user.RemoveGameFromOrder(decoded.id, id).subscribe(
      Data => {
        console.log(Data);
        if (Data.status === 200) {
          this.notifier.notify('success', 'Game removed !');
          this.ngOnInit();
        } else {
          for (let i = 0; i < Data.errors.length; i++) {
            this.notifier.notify('error', Data.errors[i]);
          }
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      );
  }

  ChangePage(page: number) {
    this.i18n.setLocale(en_US);


    this.spinner.show();
    this.ClientList = [];
    const token = window.localStorage.getItem('token');
    const decoded = jwt_decode(token);


      this.user.GetCurentOrders(decoded.id, page).subscribe(
        Data => {
        this.orderList = Data;
        this.orderList.forEach(element => {
         this.user.ifGameAccept(decoded.id, element.id).subscribe(isAccep => {
          const isAccept = isAccep;
          console.log(isAccept);
          this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
            element.year, element.genre, element.developer, true, isAccept));

        });


      });

      // console.log(this.listOfData);
      this.spinner.hide();
    });

  }
  }


