import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Genre } from 'src/app/Models/genre.model';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  constructor(private gameService: GameService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }
    Genre: Genre;
  ngOnInit() {
    this.spinner.show();
      this.gameService.getEditGenreService().subscribe(data => {
      this.Genre = data;
        console.log(data);
        this.spinner.hide();
    });
  }
  sendGenre(): void {
    this.spinner.show();
    this.gameService.setEditGenre(this.Genre).subscribe(
      Data => {
        console.log(Data);
        if (Data.status === 200) {
          this.notifier.notify('success', 'Genre edited !');
          this.router.navigate(['/admin-panel/genres']);
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
