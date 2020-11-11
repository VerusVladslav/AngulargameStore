// tslint:disable-next-line: quotemark
import { Game } from "./game.model";

export class OrderList {
  public id: number;
  public userId: string;
  public userLogin: string;
  public gameId: number;
  public isAccept: boolean;
  public game: Game;
  constructor(id: number, userid: string, userlog: string, gameid: number, game: Game, isAccept: boolean) {
    this.id = id;
    this.userId = userid;
    this.userLogin = userlog;
    this.gameId = gameid;
    this.game = game;
    this.isAccept = isAccept;
  }
 }
