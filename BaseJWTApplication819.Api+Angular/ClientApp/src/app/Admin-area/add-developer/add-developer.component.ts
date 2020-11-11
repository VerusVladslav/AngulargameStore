import { Component, OnInit } from '@angular/core';
import { AddDeveloper } from 'src/app/Models/AddModels/adddeveloper.model';
import { Developer } from 'src/app/Models/developer.model';
import { GameService } from 'src/app/Services/game.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css']
})
export class AddDeveloperComponent implements OnInit {

  newDeveloper: string;

  constructor(private gameService: GameService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService
    ) { }
  sendNewDeveloper(): void {
    this.spinner.show();

    const newdev = new AddDeveloper(this.newDeveloper);


    this.gameService.addNewDeveloper(newdev).subscribe(
      Data => {
        console.log(Data);

        if (Data.status === 200) {

          this.notifier.notify('success', 'Developer added!');
          this.router.navigate(['/admin-panel/developers']);

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

  ngOnInit(): void {

  }

}
