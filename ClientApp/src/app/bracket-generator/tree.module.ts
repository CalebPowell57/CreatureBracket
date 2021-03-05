import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalBracketComponent } from './global-bracket/global-bracket.component';
import { TreeComponent } from './tree.component';
import { MatchComponent } from './match/match.component';
import { SingleEliminationTreeComponent } from './single-elimination-tree/single-elimination-tree.component';
import { CreatureDiscussionColComponent } from './creature-discussion-col/creature-discussion-col.component';
import { SelectedMatchDiscussionInfoComponent } from './selected-match-discussion-info/selected-match-discussion-info.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GlobalBracketComponent,
    TreeComponent,
    MatchComponent,
    SingleEliminationTreeComponent,
    CreatureDiscussionColComponent,
    SelectedMatchDiscussionInfoComponent
  ],
  imports: [
    CommonModule
    ],
  exports: [
    GlobalBracketComponent
  ],
  providers: [
  ]
})
export class NgTournamentTreeModule {
}
