import { NgModule } from '@angular/core';
import { NgttSingleEliminationTreeModule } from './single-elimination-tree/ngtt-single-elimination.module';
import { MatchModule } from './match/match.module';
import { GlobalBracketComponent } from './global-bracket/global-bracket.component';


@NgModule({
  declarations: [GlobalBracketComponent],
  imports: [
    NgttSingleEliminationTreeModule,
    MatchModule
    ],
  exports: [
    NgttSingleEliminationTreeModule,
    MatchModule,
    GlobalBracketComponent
    ]
})
export class NgTournamentTreeModule {
}
