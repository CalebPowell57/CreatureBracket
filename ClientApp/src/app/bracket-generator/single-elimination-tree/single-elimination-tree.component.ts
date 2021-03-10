import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NgttRound, NgttTournament } from '../../interfaces/bracket.interface';
import { GlobalBracketComponent } from '../global-bracket/global-bracket.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'ngtt-single-elimination-tree',
  templateUrl: './single-elimination-tree.component.html',
  styleUrls: ['./single-elimination-tree.component.scss']
})
export class SingleEliminationTreeComponent implements OnChanges {

  @Input() matchTemplate: TemplateRef<any>;
  @Input() tournament: NgttTournament;

  public winnersBracket: NgttRound[];
  public final: NgttRound;

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('tournament') && changes.tournament.currentValue) {
      this.winnersBracket = this.tournament.rounds.filter(round => {
        if (round.matchups.length > 1) {
          return round;
        }
      });
      console.log(this.winnersBracket);
      this.final = this.tournament.rounds.filter(round => {
        if (round.matchups.length === 1) {
          return round
        }
      }).shift();
      console.log(this.final);
    }

  }
}
