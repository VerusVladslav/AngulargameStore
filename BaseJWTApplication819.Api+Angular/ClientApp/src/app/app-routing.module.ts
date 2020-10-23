import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddDeveloperComponent } from './Admin-area/add-developer/add-developer.component';
import { AddGameComponent } from './Admin-area/add-game/add-game.component';
import { AddGenreComponent } from './Admin-area/add-genre/add-genre.component';

import { AdminAreaComponent } from './Admin-area/Admin-area.component';
import { DeveloperListComponent } from './Admin-area/developer-list/developer-list.component';
import { GameListComponent } from './Admin-area/game-list/game-list.component';
import { GenreListComponent } from './Admin-area/genre-list/genre-list.component';
import { ProductListComponent } from './Admin-area/product-list/product-list.component';
import { ClientAreaComponent } from './Client-area/Client-area.component';
import { AdminGuard } from './guards/admin.guard';
import { LoggedInGuard } from './guards/loggedIn.guard';
import { NotLoginGuard } from './guards/notLogin.guard';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'sign-in', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignInComponent },
    { path: 'sign-up', canActivate: [NotLoginGuard], pathMatch: 'full', component: SignUpComponent },
    { path: 'admin-panel',
      canActivate: [AdminGuard],
      component: AdminAreaComponent,
      children: [
        // {path: '' , pathMatch: 'full', canActivate: [AdminGuard], component: ProductListComponent},
        {path: 'genres' , pathMatch: 'full', canActivate: [AdminGuard], component: GenreListComponent},
        {path: 'developers' , pathMatch: 'full', canActivate: [AdminGuard], component: DeveloperListComponent},
        {path: 'games' , pathMatch: 'full', canActivate: [AdminGuard], component: GameListComponent},
        {path: 'add-game' , pathMatch: 'full', canActivate: [AdminGuard], component: AddGameComponent},
        {path: 'add-developer' , pathMatch: 'full', canActivate: [AdminGuard], component: AddDeveloperComponent},
        {path: 'add-genre' , pathMatch: 'full', canActivate: [AdminGuard], component: AddGenreComponent},

        ]
    },

    { path: 'client-panel', canActivate: [LoggedInGuard], pathMatch: 'full', component: ClientAreaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
