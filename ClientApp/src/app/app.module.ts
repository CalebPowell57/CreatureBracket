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
import { CreatureSubmissionComponent } from './creature-submission/creature-submission.component';
import { GlobalBracketComponent } from './global-bracket/global-bracket.component';
import { NgttSingleEliminationTreeModule } from './bracket-generator/single-elimination-tree/ngtt-single-elimination.module';
import { MatchModule } from './bracket-generator/match/match.module';
import { NgTournamentTreeModule } from './bracket-generator/tree.module';
import { CreatureDiscussionColComponent } from './creature-discussion-col/creature-discussion-col.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StandingsComponent,
    UserBracketComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CreatureSubmissionComponent,
    GlobalBracketComponent,
    BracketManagerComponent,
    CreatureDiscussionColComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatchModule,
    NgttSingleEliminationTreeModule,
    NgTournamentTreeModule, 
    RouterModule.forRoot([
      { path: 'current-standings', component: StandingsComponent, canActivate: [StandingsGuard] },
      { path: 'user-bracket', component: UserBracketComponent, canActivate: [UserBracketGuard] },
      { path: 'bracket-manager', component: BracketManagerComponent },
      { path: 'standings', component: StandingsComponent },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [RequireAuthenticationGuard] },
      { path: '**', component: NotFoundComponent },
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
