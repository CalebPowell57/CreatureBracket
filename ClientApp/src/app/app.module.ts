import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RequireAuthenticationGuard } from './shared/requre-authentication.guard';
import { StandingsGuard } from './standings/standings.guard';
import { UserBracketGuard } from './user-bracket/user-bracket.guard';

import { HttpRequestInterceptor } from './shared/http-request.interceptor';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StandingsComponent } from './standings/standings.component';
import { BracketManagerComponent } from './bracket-manager/bracket-manager.component';
import { UserBracketComponent } from './user-bracket/user-bracket.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'current-standings', component: StandingsComponent, canActivate: [StandingsGuard] },
      { path: 'user-bracket', component: UserBracketComponent, canActivate: [UserBracketGuard] },
      { path: 'bracket-manager', component: BracketManagerComponent },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [RequireAuthenticationGuard] },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
