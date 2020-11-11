import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddGame } from 'src/app/Models/AddModels/addGame.model';
import { Developer } from 'src/app/Models/developer.model';
import { Genre } from 'src/app/Models/genre.model';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {


  constructor(private gameService: GameService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router) {}

  listOfGenres: string[] = [];
  listOfDevelopers: string[] = [];

 // NewGame = new AddGame(null, 1, 1950, null, null, null, null);


    Price: number ;
    Year: number ;
   Title: string;
   ImageURL: string;
   Description: string;
   Genre: string ;
    Developer: string ;


  sendNewGame() {
    const newgame = new AddGame(this.Title,
      this.Price, this.Year, this.ImageURL, this.Description, this.Genre, this.Developer);
    // tslint:disable-next-line: deprecation
      this.gameService.addNewGame(newgame).subscribe(
        Data => {
          console.log(Data);
          if (Data.status === 200) {

            this.notifier.notify('success', 'Game added!');
            this.router.navigate(['/admin-panel/games']);

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

  ngOnInit() {
    this.spinner.show();

    this.gameService.getAllDevelopers().subscribe(data => {
      data.forEach(element => {
        this.listOfDevelopers.push(element.name);
      });

      });
      this.gameService.getAllGenres().subscribe(data => {
        data.forEach(element => {
          this.listOfGenres.push(element.name);
        });

        });


        setTimeout(() => {
          this.spinner.hide();
        }, 1000);


    }
  }


