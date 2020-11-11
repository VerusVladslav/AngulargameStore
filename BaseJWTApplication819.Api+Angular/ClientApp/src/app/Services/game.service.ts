import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/product.model';
import { Observable } from 'rxjs';
import { Genre } from '../Models/genre.model';
import { Developer } from '../Models/developer.model';
import { Game } from '../Models/game.model';
import { Router } from '@angular/router';
import { ApiResponse } from '../Models/api.response';
import { AddDeveloper } from '../Models/AddModels/adddeveloper.model';
import { stringify } from 'querystring';
import { AddGenre } from '../Models/AddModels/addGenre.model';
import { AddGame } from '../Models/AddModels/addGame.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

constructor(private http: HttpClient,
            private router: Router) { }


baseUrl = '/api/Product';
GenreUrl = '/api/Genre';
GameUrl = '/api/Game';
DeveloperUrl = '/api/Developer';

// refreshGenre = new EventEmitter<Observable<Genre[]>>();
// refreshGame = new EventEmitter<Observable<Game[]>>();
// refreshDeveloper = new EventEmitter<Observable<Developer[]>>();

editGenre: Observable<Genre>;
editGame: Observable<Game>;
editDeveloper: Observable<Developer>;



// GameList: Observable<Game[]>;
// DeveloperList: Observable<Developer[]> ;
// GenreList: Observable<Genre[]>;


addNewDeveloper(dev: AddDeveloper): Observable<ApiResponse> {
  // this.refreshDeveloper.emit(this.DeveloperList);
 return this.http.post<ApiResponse>(this.DeveloperUrl + '/addDeveloper', dev);

}

addNewGame(game: AddGame): Observable<ApiResponse> {
  // this.refreshGame.emit(this.GameList);

  return this.http.post<ApiResponse>(this.GameUrl + '/addGame', game);
 }

addNewGenre(genre: AddGenre): Observable<ApiResponse> {
  // this.refreshGenre.emit(this.GenreList);
  return this.http.post<ApiResponse>(this.GenreUrl + '/addGenre', genre);
 }

 getEditGenreFromProject(id: number) {
  this.editGenre = this.http.get<Genre>(this.GenreUrl + '/editGenre/' + id);
  console.log(this.editGenre);

 }
 getEditGenreService() {
 return this.editGenre;

 }
 setEditGenre(genre: Genre):  Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.GenreUrl + '/editGenre', genre);

 }

 getEditGameFromProject(id: number) {
  this.editGame = this.http.get<Game>(this.GameUrl + '/editGame/' + id);
  console.log(this.editGame);

 }
 getEditGameService() {
 return this.editGame;

 }
 setEditGame(game: Game):  Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.GameUrl + '/editGame', game);

 }

getGameFromId(id: number): Observable<Game> {
  return this.http.get<Game>(this.GameUrl + '/editGame/' + id);
}

 getEditDeveloperFromProject(id: number) {
  this.editDeveloper = this.http.get<Developer>(this.DeveloperUrl + '/editDeveloper/' + id);
  console.log(this.editDeveloper);
 }
 getEditDeveloperService() {
 console.log(this.editDeveloper);
 return this.editDeveloper;

 }
 setEditDeveloper(developer: Developer):  Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.DeveloperUrl + '/editDeveloper', developer);

 }


 removeGame(id: number): Observable<ApiResponse> {
  // this.refreshGame.emit(this.GameList);
  return this.http.post<ApiResponse>(this.GameUrl + '/removeGame/' + id, null);

 }

 removeGenre(id: number): Observable<ApiResponse> {
  // this.refreshGenre.emit(this.GenreList);

  return this.http.post<ApiResponse>(this.GenreUrl + '/removeGenre/' + id, null);

 }

removeDeveloper(id: number): Observable<ApiResponse> {
  // this.refreshDeveloper.emit(this.DeveloperList);

 return this.http.post<ApiResponse>(this.DeveloperUrl + '/removeDeveloper/' + id, null);


}

getAllGenres(): Observable<Genre[]> {
  // this.GenreList = this.http.get<Genre[]>(this.GenreUrl);
  // return this.GenreList;
  return this.http.get<Genre[]>(this.GenreUrl);
}

getAllGames(): Observable<Game[]> {

 // this.GameList = this.http.get<Game[]>(this.GameUrl);
  // return this.GameList;
  return this.http.get<Game[]>(this.GameUrl);


}


getAllDevelopers(): Observable<Developer[]> {
 // this.DeveloperList =  this.http.get<Developer[]>(this.DeveloperUrl);
//  return this.DeveloperList;
  return this.http.get<Developer[]>(this.DeveloperUrl);

}



GetGlobalPages(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(this.GameUrl + '/CountPages');

}

GetCurentGames(page: number): Observable<Game[]> {
  return this.http.get<Game[]>(this.GameUrl + '/Games/' + page);


}
}
