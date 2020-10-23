import { Injectable } from '@angular/core';
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


addNewDeveloper(dev: AddDeveloper): Observable<ApiResponse> {
 return this.http.post<ApiResponse>(this.DeveloperUrl + '/addDeveloper', dev);
}

removeDeveloper(id: number): Observable<ApiResponse> {

 return this.http.post<ApiResponse>(this.DeveloperUrl + '/removeDeveloper/' + id, null);


}

getAllGenres(): Observable<Genre[]> {
  return this.http.get<Genre[]>(this.GenreUrl);
}

getAllGames(): Observable<Game[]> {
  return this.http.get<Game[]>(this.GameUrl);
}


getAllDevelopers(): Observable<Developer[]> {
  return this.http.get<Developer[]>(this.DeveloperUrl);
}

getAllProduct(): Observable<Product[]> {
  return this.http.get<Product[]>(this.baseUrl);
}
}
