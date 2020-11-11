import { Component, EventEmitter, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Genre } from 'src/app/Models/genre.model';
import { GameService } from 'src/app/Services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  constructor(private gameService: GameService,
              private spinner: NgxSpinnerService,
              private notifier: NotifierService,
              private router: Router
              ) { }





              listOfData: Genre[] = [];
              listOfColumn = [

                {
                  title: 'Name',
                },
                {
                  title: '',
                },
                {
                  title: '',
                }
              ];
              removeElement(id: number) {
                this.spinner.show();
              this.gameService.removeGenre(id).subscribe(
              Data => {
                console.log(Data);
                if (Data.status === 200) {

                  this.notifier.notify('success', 'Genre removed !');
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
  ngOnInit() {
    this.spinner.show();
      this.gameService.getAllGenres().subscribe(data => {
     this.listOfData = data;
       console.log(data);
        this.spinner.hide();
    });
  }
  editElement(id: number) {


    this.spinner.show();
    this.gameService.getEditGenreFromProject(id);
    this.spinner.hide();
    this.router.navigate(['/admin-panel/edit-genre']);
  }
}
