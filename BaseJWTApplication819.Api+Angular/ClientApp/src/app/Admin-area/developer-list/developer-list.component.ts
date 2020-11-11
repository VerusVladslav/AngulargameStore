import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Developer } from 'src/app/Models/developer.model';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DeveloperListComponent implements OnInit {

  constructor(private gameService: GameService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router) { }

    listOfData: Developer[] = [];
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
    this.gameService.removeDeveloper(id).subscribe(
    Data => {
      console.log(Data);
      if (Data.status === 200) {

        this.notifier.notify('success', 'Developer removed !');
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
this.gameService.getAllDevelopers().subscribe(data => {
this.listOfData = data;
this.spinner.hide();
});
}

editElement(id: number) {
  this.spinner.show();
  this.gameService.getEditDeveloperFromProject(id);
  console.log(id);
  this.spinner.hide();
  this.router.navigate(['/admin-panel/edit-developer']);
}

}
