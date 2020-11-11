import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Developer } from 'src/app/Models/developer.model';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-edit-developer',
  templateUrl: './edit-developer.component.html',
  styleUrls: ['./edit-developer.component.css']
})
export class EditDeveloperComponent implements OnInit {

  Developer: Developer;
  constructor(private gameService: GameService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }

  ngOnInit() {
    this.spinner.show();
      this.gameService.getEditDeveloperService().subscribe(data => {
      this.Developer = data;
        console.log(data);
        this.spinner.hide();
    });
  }

  sendDeveloper() {
    this.spinner.show();
    this.gameService.setEditDeveloper(this.Developer).subscribe(
      Data => {
        console.log(Data);
        if (Data.status === 200) {
          this.notifier.notify('success', 'Developer edited !');
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
}
