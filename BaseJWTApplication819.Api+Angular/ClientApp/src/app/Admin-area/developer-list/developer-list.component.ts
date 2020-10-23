import { Component, OnInit } from '@angular/core';
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
    private spinner: NgxSpinnerService) { }

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
      this.spinner.hide();
    }
  );
  this.ngOnInit();
    }

ngOnInit() {
this.spinner.show();
this.gameService.getAllDevelopers().subscribe(data => {
this.listOfData = data;
this.spinner.hide();
});
}

}
