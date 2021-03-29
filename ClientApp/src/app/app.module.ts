import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';

import { RequireAuthenticationGuard } from './shared/requre-authentication.guard';
import { StandingsGuard } from './standings/standings.guard';
import { UserBracketGuard } from './bracket/user-bracket/user-bracket.guard';
import { VerifyAccountGuard } from './verify-account/verify-account.guard';
import { RequireSuperPermissionsGuard } from './shared/requre-super-permissions.guard';
import { CreatureApprovalGuard } from './creature-approval/creature-approval.guard';

import { HttpRequestInterceptor } from './shared/http-request.interceptor';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './standings/standings.component';
import { BracketManagerComponent } from './bracket-manager/bracket-manager.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreatureSubmissionComponent } from './creature-submission/creature-submission.component';
import { BracketModule } from './bracket/bracket.module';
import { NoPermissionsComponent } from './no-permissions/no-permissions.component';
import { CreatureApprovalComponent } from './creature-approval/creature-approval.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { SuccessfulAccountCreationComponent } from './successful-account-creation/successful-account-creation.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UnauthorizedGuard } from './unauthorized/unauthorized.guard';

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
    VerifyAccountComponent,
    UnauthorizedComponent,
    SuccessfulAccountCreationComponent
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
      { path: 'successful-account-creation', component: SuccessfulAccountCreationComponent },
      { path: 'verify-account', component: VerifyAccountComponent, canActivate: [VerifyAccountGuard] },
      { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [UnauthorizedGuard] },
      { path: 'current-standings', component: StandingsComponent, canActivate: [StandingsGuard, RequireAuthenticationGuard] },
      { path: 'creature-approval', component: CreatureApprovalComponent, canActivate: [/*RequireSuperPermissionsGuard, */RequireAuthenticationGuard, CreatureApprovalGuard] },
      { path: 'bracket-manager', component: BracketManagerComponent, canActivate: [/*RequireSuperPermissionsGuard, */RequireAuthenticationGuard] },
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
