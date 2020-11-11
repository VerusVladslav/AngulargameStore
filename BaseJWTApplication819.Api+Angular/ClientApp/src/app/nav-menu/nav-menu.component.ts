import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isLogin = false;
  isAdmin = false;
  search: string;
  constructor(private authService: AuthService,
    private user: UserService,
    private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.isLogin = true;
     this.isAdmin = this.authService.isAdmin();
    } else {
      this.isLogin = false;
      this.isAdmin = false;

    }
    this.authService.statusLogin.subscribe(
      (data) => {
        this.isAdmin = this.authService.isAdmin();
        this.isLogin = data;
      }
    );

       // this.isAdmin = this.authService.isAdmin();
       // this.isLogin = this.authService.isLoggedIn();
  }

  Logout() {
    this.authService.Logout();
  // this.isLogin = this.authService.isLoggedIn();
   // this.isLogin = true;
  }

  GetOrder() {


  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  Search() {
    // console.log(this.router.url);
   // this.user.SetSearch(this.search);


    // this.router.navigate(['/client-panel/' + this.search]);
  }
}
