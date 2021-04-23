import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ToastrModule } from 'ngx-toastr';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AppComponent } from './app.component';
import { BracketManagerComponent } from './bracket-manager/bracket-manager.component';
import { BracketModule } from './bracket/bracket.module';
import { CreatureApprovalComponent } from './creature-approval/creature-approval.component';
import { CreatureSubmissionComponent } from './creature-submission/creature-submission.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NaviComponent } from './navi/navi.component';
import { NoPermissionsComponent } from './no-permissions/no-permissions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotSignedInComponent } from './not-signed-in/not-signed-in.component';
import { NotSignedInGuard } from './not-signed-in/not-signed-in.guard';
import { SeedTournamentComponent } from './seed-tournament/seed-tournament.component';
import { initApp } from './shared/delay-init-app';
import { CustomErrorHandler } from './shared/error.handler';
import { HttpRequestInterceptor } from './shared/http-request.interceptor';
import { RequireAuthenticationGuard } from './shared/requre-authentication.guard';
import { RequireSuperPermissionsGuard } from './shared/requre-super-permissions.guard';
import { TournamentOpenGuard } from './shared/tournament-open.guard';
import { TournamentStartedGuard } from './shared/tournament-started.guard';
import { StandingsComponent } from './standings/standings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent2 } from './sidebar/chat/chat.component';
import { CreatureInfoComponent } from './sidebar/creature-info/creature-info.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StandingsComponent,
    NotFoundComponent,
    CreatureSubmissionComponent,
    BracketManagerComponent,
    AccountSettingsComponent,
    NoPermissionsComponent,
    NotSignedInComponent,
    CreatureApprovalComponent,
    SeedTournamentComponent,
    NaviComponent,
    SidebarComponent,
    ChatComponent2,
    CreatureInfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BracketModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    RouterModule.forRoot([
      { path: 'account-settings', component: AccountSettingsComponent, canActivate: [RequireAuthenticationGuard] },
      { path: 'creature-submission', component: CreatureSubmissionComponent, canActivate: [RequireAuthenticationGuard, TournamentOpenGuard] },
      { path: 'seed-tournament', component: SeedTournamentComponent, canActivate: [RequireAuthenticationGuard, RequireSuperPermissionsGuard,  TournamentOpenGuard] },
      { path: 'standings', component: StandingsComponent, canActivate: [RequireAuthenticationGuard, TournamentStartedGuard] },
      { path: 'creature-approval', component: CreatureApprovalComponent, canActivate: [RequireAuthenticationGuard, TournamentOpenGuard, RequireSuperPermissionsGuard] },
      { path: 'bracket-manager', component: BracketManagerComponent, canActivate: [RequireAuthenticationGuard, RequireSuperPermissionsGuard] },
      { path: 'not-signed-in', component: NotSignedInComponent, canActivate: [NotSignedInGuard] },
      { path: 'no-permissions', component: NoPermissionsComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]),
    MsalModule.forRoot({
      auth: {
        clientId: '5c620c19-7513-4a48-9406-8bf19d31711b',
        authority: 'https://login.microsoftonline.com/eaad4fe4-754b-422e-8fa2-6df1b51005bb',
        redirectUri: 'https://localhost:44316'
        /*redirectUri: 'https://ferenginar:44670'*/
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
      {
        popUp: !isIE,
        consentScopes: [
          'openid',
          'profile',
        ],
        protectedResourceMap: [
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ],
        extraQueryParameters: {}
      })
  ],
  providers: [
  {
    provide: APP_INITIALIZER,
    useFactory: initApp,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
