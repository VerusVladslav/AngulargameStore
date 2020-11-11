import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/Services/game.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddGenre } from 'src/app/Models/AddModels/addGenre.model';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {

  newGenre: string;

  constructor(private gameService: GameService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }


    sendNewGenre(): void {
      this.spinner.show();
      const newgenre = new AddGenre(this.newGenre);


      this.gameService.addNewGenre(newgenre).subscribe(
        Data => {
          console.log(Data);
          if (Data.status === 200) {

            this.notifier.notify('success', 'Genre added!');
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

      ngOnInit() {
      }

}
