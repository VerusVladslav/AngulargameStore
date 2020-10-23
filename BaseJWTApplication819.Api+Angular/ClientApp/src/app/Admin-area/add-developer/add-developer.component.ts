import { Component, OnInit } from '@angular/core';
import { AddDeveloper } from 'src/app/Models/AddModels/adddeveloper.model';
import { Developer } from 'src/app/Models/developer.model';
import { GameService } from 'src/app/Services/game.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css']
})
export class AddDeveloperComponent implements OnInit {

  newDeveloper: string;

  constructor(private gameService: GameService,
    private router: Router,
    private spinner: NgxSpinnerService) { }
  sendNewDeveloper(): void {
    this.spinner.show();

    const newdev = new AddDeveloper(this.newDeveloper);


    this.gameService.addNewDeveloper(newdev).subscribe(
      Data => {
        console.log(Data);
        this.spinner.hide();
      }
    );




  }

  ngOnInit(): void {

  }

}
