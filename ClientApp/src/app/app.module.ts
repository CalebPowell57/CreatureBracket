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
import { VerifyAccountGuard } from './verify-account/verify-account.guard';
import { RequireSuperPermissionsGuard } from './shared/requre-super-permissions.guard';

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
import { NgTournamentTreeModule } from './bracket-generator/tree.module';
import { NoPermissionsComponent } from './no-permissions/no-permissions.component';
import { CreatureApprovalComponent } from './creature-approval/creature-approval.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { SuccessfulAccountCreationComponent } from './successful-account-creation/successful-account-creation.component';
import { ChatComponent } from './chat/chat.component';
import { ImageCropperModule } from 'ngx-image-cropper';

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
    BracketManagerComponent,
    NoPermissionsComponent,
    CreatureApprovalComponent,
    VerifyAccountComponent,
    SuccessfulAccountCreationComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgTournamentTreeModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    RouterModule.forRoot([
      { path: 'successful-account-creation', component: SuccessfulAccountCreationComponent },
      { path: 'verify-account', component: VerifyAccountComponent, canActivate: [VerifyAccountGuard] },
      { path: 'current-standings', component: StandingsComponent, canActivate: [StandingsGuard, RequireAuthenticationGuard] },
      { path: 'creature-approval', component: CreatureApprovalComponent, canActivate: [/*RequireSuperPermissionsGuard, */RequireAuthenticationGuard] },
      { path: 'user-bracket', component: UserBracketComponent, canActivate: [UserBracketGuard, RequireAuthenticationGuard] },
      { path: 'bracket-manager', component: BracketManagerComponent, canActivate: [/*RequireSuperPermissionsGuard, */RequireAuthenticationGuard] },
      { path: 'standings', component: StandingsComponent, canActivate: [RequireAuthenticationGuard] },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'no-permissions', component: NoPermissionsComponent },
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
