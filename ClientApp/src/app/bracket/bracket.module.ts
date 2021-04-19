import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UTCDatePipe } from '../pipes/UTCDate.pipe';
import { RequireAuthenticationGuard } from '../shared/requre-authentication.guard';
import { TournamentStartedGuard } from '../shared/tournament-started.guard';
import { BracketComponent } from './bracket/bracket.component';
import { ChatComponent } from './bracketComponents/creature-discussion-col/chat/chat.component';
import { CreatureDiscussionColComponent } from './bracketComponents/creature-discussion-col/creature-discussion-col.component';
import { SelectedMatchDiscussionInfoComponent } from './bracketComponents/creature-discussion-col/selected-match-discussion-info/selected-match-discussion-info.component';
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
    CreatureDiscussionColComponent,
    SelectedMatchDiscussionInfoComponent,
    ChatComponent,
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
    UserBracketComponent
  ],
  providers: [
  ]
})
export class BracketModule {
}
