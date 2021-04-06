import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketComponent } from './bracket/bracket.component';
import { MatchComponent } from './bracketComponents/match/match.component';
import { UserMatchComponent } from './bracketComponents/user-match/user-match.component';
import { SingleEliminationTreeComponent } from './bracketComponents/single-elimination-tree/single-elimination-tree.component';
import { CreatureDiscussionColComponent } from './bracketComponents/creature-discussion-col/creature-discussion-col.component';
import { SelectedMatchDiscussionInfoComponent } from './bracketComponents/creature-discussion-col/selected-match-discussion-info/selected-match-discussion-info.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './bracketComponents/creature-discussion-col/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserBracketComponent } from './user-bracket/user-bracket.component';


@NgModule({
  declarations: [
    BracketComponent,
    UserBracketComponent,
    MatchComponent,
    UserMatchComponent,
    SingleEliminationTreeComponent,
    CreatureDiscussionColComponent,
    SelectedMatchDiscussionInfoComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'global-bracket', component: BracketComponent },
      { path: 'user-bracket', component: UserBracketComponent }
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
