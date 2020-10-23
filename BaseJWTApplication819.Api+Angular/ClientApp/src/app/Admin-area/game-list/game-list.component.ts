import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Developer } from 'src/app/Models/developer.model';
import { Game } from 'src/app/Models/game.model';
import { Genre } from 'src/app/Models/genre.model';
import { GameService } from 'src/app/Services/game.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(private gameService: GameService,
    private spinner: NgxSpinnerService) { }

    listOfData: Game[] = [];
    listOfGenres: Genre[] = [];
    listOfDevelopers: Developer[] = [];

    listOfColumn = [
      {
        title: '',
      },
      {
        title: 'Id',
      },
      {
        title: 'Title',
      },
      {
        title: 'Year',
      },
      {
        title: 'Price',
      }
      ,
      {
        title: 'Genre',
      },
      {
        title: 'Developer',
      }
      ,
      {
        title: '',
      },
      {
        title: '',
      }
    ];
ngOnInit() {
this.spinner.show();

this.gameService.getAllDevelopers().subscribe(data => {
  this.listOfDevelopers = data;

  });
  this.gameService.getAllGenres().subscribe(data => {
    this.listOfGenres = data;

    });

this.gameService.getAllGames().subscribe(data => {
this.listOfData = data;

this.spinner.hide();
});


}

}
