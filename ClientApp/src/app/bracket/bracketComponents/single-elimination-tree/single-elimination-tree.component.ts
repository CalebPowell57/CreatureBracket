import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NgttRound, NgttTournament } from '../../../interfaces/bracket.interface';

@Component({
  selector: 'ngtt-single-elimination-tree',
  templateUrl: './single-elimination-tree.component.html',
  styleUrls: ['./single-elimination-tree.component.scss']
})
export class SingleEliminationTreeComponent implements OnChanges {

  @Input() matchTemplate: TemplateRef<any>;
  @Input() tournament: NgttTournament;

  public rounds: NgttRound[] = [];
  public final: NgttRound = { matchups: [] };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('tournament') && changes.tournament.currentValue) {
      this.rounds = this.tournament.rounds.filter(round => {
        if (round.matchups.length > 1) {
          return round;
        }
      });
      console.log(this.rounds);
      this.final = this.tournament.rounds.filter(round => {
        if (round.matchups.length === 1) {
          return round
        }
      }).shift();
      console.log(this.final);
    }
  }
}
