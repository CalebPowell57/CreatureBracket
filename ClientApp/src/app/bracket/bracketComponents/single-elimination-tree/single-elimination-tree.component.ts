import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { IUserBracketDTO } from '../../../interfaces/UserBracketDTO.interface';
import { IUserRoundDTO } from '../../../interfaces/UserRoundDTO.interface';

@Component({
  selector: 'ngtt-single-elimination-tree',
  templateUrl: './single-elimination-tree.component.html',
  styleUrls: ['./single-elimination-tree.component.scss']
})
export class SingleEliminationTreeComponent implements OnChanges {

  @Input() matchTemplate: TemplateRef<any>;
  @Input() tournament: IUserBracketDTO;
  @Input() isGlobal: boolean;

  public rounds: IUserRoundDTO[] = [];
  public final: IUserRoundDTO = { matchups: [], rank: 0 };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('tournament') && changes.tournament.currentValue) {
      this.rounds = this.tournament.rounds.filter(round => {
        if (round.matchups.length > 1) {
          return round;
        }
      });
      this.final = this.tournament.rounds.filter(round => {
        if (round.matchups.length === 1) {
          return round
        }
      }).shift();
    }
  }
}
