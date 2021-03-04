import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalBracketComponent } from './global-bracket/global-bracket.component';
import { TreeComponent } from './tree.component';
import { MatchComponent } from './match/match.component';
import { SingleEliminationTreeComponent } from './single-elimination-tree/single-elimination-tree.component';
import { CreatureDiscussionColComponent } from '../creature-discussion-col/creature-discussion-col.component';


@NgModule({
  declarations: [
    GlobalBracketComponent,
    TreeComponent,
    MatchComponent,
    SingleEliminationTreeComponent,
    CreatureDiscussionColComponent
  ],
  imports: [
    CommonModule
    ],
  exports: [
    GlobalBracketComponent
    ]
})
export class NgTournamentTreeModule {
}
