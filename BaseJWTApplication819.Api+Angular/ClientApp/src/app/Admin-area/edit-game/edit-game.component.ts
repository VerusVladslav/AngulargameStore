import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Game } from 'src/app/Models/game.model';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  EditGame: Game;
  listOfGenres: string[] = [];
  listOfDevelopers: string[] = [];

  constructor(private gameService: GameService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }

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
      this.gameService.getEditGameService().subscribe(data => {
      this.EditGame = data;
        console.log(data);
        this.spinner.hide();
    });
  }
  sendGame() {
    this.spinner.show();
    this.gameService.setEditGame(this.EditGame).subscribe(
      Data => {
        console.log(Data);
        if (Data.status === 200) {
          this.notifier.notify('success', 'Game edited !');
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
}
