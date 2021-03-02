import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { NoPermissionsComponent } from './no-permissions/no-permissions.component';
import { CreatureApprovalComponent } from './creature-approval/creature-approval.component';
import { RequireSuperPermissionsGuard } from './shared/requre-super-permissions.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StandingsComponent,
    BracketManagerComponent,
    UserBracketComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CreatureSubmissionComponent,
    GlobalBracketComponent,
    NoPermissionsComponent,
    CreatureApprovalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    RouterModule.forRoot([
      { path: 'current-standings', component: StandingsComponent, canActivate: [StandingsGuard, RequireAuthenticationGuard] },
      { path: 'creature-approval', component: CreatureApprovalComponent, canActivate: [/*RequireSuperPermissionsGuard, */RequireAuthenticationGuard] },
      { path: 'user-bracket', component: UserBracketComponent, canActivate: [UserBracketGuard, RequireAuthenticationGuard] },
      { path: 'bracket-manager', component: BracketManagerComponent, canActivate: [/*RequireSuperPermissionsGuard, */RequireAuthenticationGuard] },
      { path: 'standings', component: StandingsComponent, canActivate: [RequireAuthenticationGuard] },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'no-permissions', component: NoPermissionsComponent },
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
