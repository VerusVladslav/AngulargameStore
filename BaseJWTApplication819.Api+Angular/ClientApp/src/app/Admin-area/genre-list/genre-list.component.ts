import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Genre } from 'src/app/Models/genre.model';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  constructor(private gameService: GameService,
              private spinner: NgxSpinnerService) { }

              listOfData: Genre[] = [];
              listOfColumn = [
                {
                  title: 'Id',
                },
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
  ngOnInit() {
    this.spinner.show();
      this.gameService.getAllGenres().subscribe(data => {
     this.listOfData = data;
        console.log(data);
        this.spinner.hide();
    });
  }

}
