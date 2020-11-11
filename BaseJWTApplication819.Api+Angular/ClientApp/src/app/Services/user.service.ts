import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../Models/game.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response';
import { Order } from '../Models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }
baseUrl = '/api/Account';
searchstr = '';

AddGameToOrder(iduser: string, idgame:  number): Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.baseUrl + '/addToOrder/' + iduser + '/' + idgame, null);

}
GetOrderGames(id: number): Observable<Game[]> {
  return this.http.get<Game[]>(this.baseUrl + '/getOrderlist/' + id);


}

GetOrderList(): Observable<Order[]> {
  return this.http.get<Order[]>(this.baseUrl + '/getOrderAllOrders');
}

RemoveGameFromOrder(iduser: string, idgame:  number): Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.baseUrl + '/removeFromOrderlist/' + iduser + '/' + idgame, null);


}

SetSearch(search: string) {
  this.searchstr = search;
}
GetSearch() {
 return this.searchstr ;
}
getGeameKey(idgame: number): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(this.baseUrl + '/getGameKey/' +  idgame);

}

ifGameAccept(idUser: string , idGame: number): Observable<boolean> {
  return this.http.get<boolean>(this.baseUrl + '/ifGameAccept/'  + idUser + '/' + idGame);
}
acceptOrder(idorder: number): Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.baseUrl + '/acceptOrder/'  + idorder , null);

}


GetOrderCountPages(idUser: string): Observable<ApiResponse> {
  return this.http.get<ApiResponse>( '/api/Game/CountPages/' + idUser);

}
GetCurentOrders(idUser: string, page: number): Observable<Game[]> {
  return this.http.get<Game[]>( '/api/Game/getOrders/' + idUser + '/' + page);

}
}
