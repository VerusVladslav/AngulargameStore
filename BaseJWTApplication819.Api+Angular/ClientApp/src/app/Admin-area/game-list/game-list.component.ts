import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router) { }

    listOfData: Game[] = [];
    listOfGenres: Genre[] = [];
    listOfDevelopers: Developer[] = [];

    listOfColumn = [
      {
        title: '',
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


editElement(id: number) {
  this.spinner.show();
    this.gameService.getEditGameFromProject(id);
    this.spinner.hide();
     this.router.navigate(['/admin-panel/edit-game']);
}

removeElement(id: number) {
  this.spinner.show();
this.gameService.removeGame(id).subscribe(
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

}
