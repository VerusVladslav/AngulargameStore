import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api.response';
import { SignInModel } from '../Models/sign-in.model';
import { SignUpModel } from '../Models/sign-up.model';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }
  baseUrl = '/api/Account';
  statusLogin = new EventEmitter<boolean>();

  SignUp(model: SignUpModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register', model);
  }

  SignIn(model: SignInModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/login', model);
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.statusLogin.emit(false);
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {

    const role = localStorage.getItem('role');
   // const decoded = jwt_decode(token);
    if (role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }


}
