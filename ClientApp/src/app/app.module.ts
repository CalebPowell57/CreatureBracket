import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { BracketManagerComponent } from './bracket-manager/bracket-manager.component';
import { BracketModule } from './bracket/bracket.module';
import { CreatureApprovalComponent } from './creature-approval/creature-approval.component';
import { CreatureApprovalGuard } from './creature-approval/creature-approval.guard';
import { CreatureSubmissionComponent } from './creature-submission/creature-submission.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NoPermissionsComponent } from './no-permissions/no-permissions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SeedTournamentComponent } from './seed-tournament/seed-tournament.component';
import { CustomErrorHandler } from './shared/error.handler';
import { HttpRequestInterceptor } from './shared/http-request.interceptor';
import { RequireAuthenticationGuard } from './shared/requre-authentication.guard';
import { RequireSuperPermissionsGuard } from './shared/requre-super-permissions.guard';
import { StandingsComponent } from './standings/standings.component';
import { StandingsGuard } from './standings/standings.guard';
import { initApp } from './shared/delay-init-app';

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
    NoPermissionsComponent,
    CreatureApprovalComponent,
    SeedTournamentComponent
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
      { path: 'creature-submission/:userSelected', component: CreatureSubmissionComponent, canActivate: [RequireAuthenticationGuard] },//add a guard
      { path: 'seed-tournament', component: SeedTournamentComponent, canActivate: [RequireSuperPermissionsGuard, RequireAuthenticationGuard] },
      { path: 'current-standings', component: StandingsComponent, canActivate: [StandingsGuard, RequireAuthenticationGuard] },
      { path: 'creature-approval', component: CreatureApprovalComponent, canActivate: [RequireSuperPermissionsGuard, RequireAuthenticationGuard, CreatureApprovalGuard] },
      { path: 'bracket-manager', component: BracketManagerComponent, canActivate: [RequireSuperPermissionsGuard, RequireAuthenticationGuard] },
      { path: 'standings', component: StandingsComponent, canActivate: [RequireAuthenticationGuard] },
      { path: 'no-permissions', component: NoPermissionsComponent },
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [RequireAuthenticationGuard] },
      { path: '**', component: NotFoundComponent }
    ]),
    MsalModule.forRoot({
      auth: {
        clientId: '5c620c19-7513-4a48-9406-8bf19d31711b',
        authority: 'https://login.microsoftonline.com/eaad4fe4-754b-422e-8fa2-6df1b51005bb',
        redirectUri: 'https://localhost:44316',
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
    }
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
