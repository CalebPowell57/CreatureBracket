import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UTCDatePipe } from '../pipes/UTCDate.pipe';
import { RequireAuthenticationGuard } from '../shared/requre-authentication.guard';
import { TournamentStartedGuard } from '../shared/tournament-started.guard';
import { BracketComponent } from './bracket/bracket.component';
import { MatchComponent } from './bracketComponents/match/match.component';
import { SingleEliminationTreeComponent } from './bracketComponents/single-elimination-tree/single-elimination-tree.component';
import { UserMatchComponent } from './bracketComponents/user-match/user-match.component';
import { GlobalBracketComponent } from './global-bracket/global-bracket.component';
import { UserBracketComponent } from './user-bracket/user-bracket.component';


@NgModule({
  declarations: [
    BracketComponent,
    UserBracketComponent,
    GlobalBracketComponent,
    MatchComponent,
    UserMatchComponent,
    SingleEliminationTreeComponent,
    UTCDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'user-bracket', component: UserBracketComponent, canActivate: [RequireAuthenticationGuard, TournamentStartedGuard] },
      { path: 'tournament', component: GlobalBracketComponent, canActivate: [RequireAuthenticationGuard, TournamentStartedGuard] }
      ])
    ],
  exports: [
    BracketComponent,
    UserBracketComponent,
    UTCDatePipe
  ],
  providers: [
  ]
})
export class BracketModule {
}
