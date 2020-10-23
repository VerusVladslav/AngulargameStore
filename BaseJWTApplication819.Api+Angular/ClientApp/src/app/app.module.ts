import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DemoNgZorroAntdModule } from './ng-zorro.module';
import { ProductListComponent } from './Admin-area/product-list/product-list.component';




import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AdminAreaComponent } from './Admin-area/Admin-area.component';
import { ClientAreaComponent } from './Client-area/Client-area.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {GenreListComponent} from './Admin-area/genre-list/genre-list.component';
import {GameListComponent} from './Admin-area/game-list/game-list.component';
import {DeveloperListComponent} from './Admin-area/developer-list/developer-list.component';
import {AddGameComponent} from './Admin-area/add-game/add-game.component';
import {AddDeveloperComponent} from './Admin-area/add-developer/add-developer.component';
import {AddGenreComponent} from './Admin-area/add-genre/add-genre.component';


import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { TokenInterceptor } from './interceptor';

const configNotifier: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right'
    },
    vertical: {
      position: 'top'
    }
  }
};
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AdminAreaComponent,
    ClientAreaComponent,
    SignUpComponent,
    SignInComponent,
    ProductListComponent,
    GenreListComponent,
    DeveloperListComponent,
    GameListComponent,
    AddGenreComponent,
    AddDeveloperComponent,
    AddGameComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NotifierModule.withConfig(configNotifier),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
  ],
  providers: [
    NgxSpinnerService,
    {provide: NZ_ICONS, useValue: icons },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
