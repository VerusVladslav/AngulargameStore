import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Game } from 'src/app/Models/game.model';
import { GameService } from 'src/app/Services/game.service';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  InfoGame: Game;
  constructor(private gameService: GameService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private activateRoute: ActivatedRoute) { }

    sub: any;
    id: string;
  ngOnInit() {
    this.spinner.show();
    this.id = this.activateRoute.snapshot.paramMap.get('id') ;

    this.gameService.getGameFromId(+this.id).subscribe(data => {
      this.InfoGame = data;
      console.log(data);
      this.spinner.hide();

    });


  }

}
