import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Game } from 'src/app/Models/game.model';
import { GameService } from 'src/app/Services/game.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/Services/user.service';
import { ClientOrder } from 'src/app/Models/ClientGame.model';
import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-game-client-list',
  templateUrl: './game-client-list.component.html',
  styleUrls: ['./game-client-list.component.css']
})
export class GameClientListComponent implements OnInit {

  constructor( private gameService: GameService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router,
    private user: UserService,
    private activateRoute: ActivatedRoute) { }

  listOfData: Game[] = [];
  orderList: Game [] = [];
  ClientList: ClientOrder [] = [];


  listOfCurrentPageData: ClientOrder[] = [];
  searchText:  string;
  countElement: number;




  ngOnInit() {
    this.spinner.show();

    const token = window.localStorage.getItem('token');
    const decoded = jwt_decode(token);
   // this.gameService.getAllGames().subscribe(data => {
    this.gameService.GetCurentGames(1).subscribe(data => {
   this.listOfData = data;
      this.searchText = this.user.GetSearch();
      console.log(this.searchText);

      this.user.GetOrderGames(decoded.id).subscribe(
      // this.user.GetCurentOrders(decoded.id, page).subscribe(
     Data => {
        this.orderList = Data;
         this.spinner.hide();
         this.ClientList = [];
         this.listOfData.forEach(element => {
           if (Data !== null) {
         if (this.orderList.find(x => x.id === element.id) == null) {
            this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
               element.year, element.genre, element.developer, false, false));
           } else {
            this.user.ifGameAccept(decoded.id, element.id).subscribe(isAccep => {
              const isAccept = isAccep;
              // console.log(isAccept);
              this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
                element.year, element.genre, element.developer, true, isAccept));

            });

          }
        } else {
          this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
            element.year, element.genre, element.developer, false, false));
        }
         });


        // const search = this.activateRoute.snapshot.paramMap.get('search') ;

        // if (search !== null) {
       //   this.SearchList = [];
       //   this.ClientList.forEach(element => {
       //     if (element.title.toLowerCase().includes(search.toLowerCase()) !== null) {
        //      console.log(element);
        //       this.SearchList.push(element);
         //     }
         //   });
          //  this.ClientList = this.SearchList;
            // this.router.navigate(['/client-panel']);

          // }
       //  }
        // console.log(search);
        // if (search !== '') {
        //   this.ClientList.forEach(element => {
        //     if (element.title === search) {
        //       this.SearchList.push(element);
        //     }
        //   });
        //   this.ClientList =  this.SearchList;
        // this.SearchList = [];
        // }
        this.gameService.GetGlobalPages().subscribe(page => {
          this.countElement = page.status;
          console.log(this.countElement);
        });
        this.spinner.hide();
      });



      });

  }

  ChangePage(event: number) {

   // event.emit(this.page);
  // console.log(event);
  //   this.spinner.show();

  this.spinner.show();

  const token = window.localStorage.getItem('token');
  const decoded = jwt_decode(token);
 // this.gameService.getAllGames().subscribe(data => {
  this.gameService.GetCurentGames(event).subscribe(data => {
 this.listOfData = data;
    this.searchText = this.user.GetSearch();
    console.log(this.searchText);

    this.user.GetOrderGames(decoded.id).subscribe(
    // this.user.GetCurentOrders(decoded.id, page).subscribe(
   Data => {
      this.orderList = Data;
       this.spinner.hide();
       this.ClientList = [];
       this.listOfData.forEach(element => {
         if (Data !== null) {
       if (this.orderList.find(x => x.id === element.id) == null) {
          this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
             element.year, element.genre, element.developer, false, false));
         } else {
          this.user.ifGameAccept(decoded.id, element.id).subscribe(isAccep => {
            const isAccept = isAccep;
            // console.log(isAccept);
            this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
              element.year, element.genre, element.developer, true, isAccept));

          });

        }
      } else {
        this.ClientList.push(new ClientOrder(element.id, element.title, element.price, element.description, element.imageURL,
          element.year, element.genre, element.developer, false, false));
      }
       });




      this.spinner.hide();
    });



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
         // this.router.navigate(['/client-panel']);
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

  addToOrder(id: number)  {

      const token = window.localStorage.getItem('token');
      const decoded = jwt_decode(token);
     this.user.AddGameToOrder(decoded.id, id).subscribe(
      Data => {

        if (Data.status === 200) {

          this.notifier.notify('success', 'Game added!');
          // this.router.navigate(['/client-panel']);
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
  gameinfo(id: number) {
    // console.log(id);
    this.router.navigate(['/client-panel/gameinfo',  id]);



  }







}
