import { Game } from './game.model';

export class Order {
 public id: number;
 public userId: string;
 public userLogin: string;
 public game: Game;
 public isAccept: boolean;

 constructor(id: number, userid: string, userlog: string, game: Game, isAccept: boolean) {
   this.id = id;
   this.userId = userid;
   this.userLogin = userlog;
   this.game = game;
   this.isAccept = isAccept;
 }
}
