import { Component, Input } from '@angular/core';
import { NgttTournament } from 'ng-tournament-tree';
@Component({
  selector: 'tt-user-match',
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.scss']
}) 
export class UserMatchComponent {

  @Input() matchup: any;
  @Input() tournament: NgttTournament;

  private creatureVotedForId: string;

  public constructor() { }

  ngOnInit() {
    if (this.matchup.vote) {
      this.creatureVotedForId = this.matchup.vote.creatureId;
    }
  }

  select(creature: any) {
    this.creatureVotedForId = creature.creatureId;
    creature.winner = true;
    this.matchup.unset = false;

    let loser = this.matchup.creature1 === creature ? this.matchup.creature2 : this.matchup.creature1;
    loser.winner = false;

    let rounds = this.tournament.rounds.filter(x => x.rank === this.matchup.roundRank + 1);

    if (rounds.length) {
      let round = rounds[0];

      let index = this.matchup.matchupSeed / 2;

      let isOdd = this.matchup.matchupSeed % 2 != 0;

      if (isOdd) {
        index = (this.matchup.matchupSeed - 1) / 2;
      }

      let nextMatchup = round.matchups[index];

      if (isOdd) {
        nextMatchup.creature2 = Object.assign({}, creature);
        nextMatchup.creature2.winner = false;
      } else {
        nextMatchup.creature1 = Object.assign({}, creature);
        nextMatchup.creature1.winner = false;
      }

      this.clearFutureMatches(nextMatchup, loser);
    }
    else {
      //
    }
  }

  clearFutureMatches(matchup: any, creature: any) {
    while (true) {
      let rounds = this.tournament.rounds.filter(x => x.rank === matchup.roundRank + 1);

      if (rounds.length) {
        let round = rounds[0];

        let index = matchup.matchupSeed / 2;

        let isCurrentMatchupOdd = matchup.matchupSeed % 2 != 0;

        if (isCurrentMatchupOdd) {
          index = (matchup.matchupSeed - 1) / 2;
        }

        matchup.unset = true;

        let nextMatchup = round.matchups[index];

        if (isCurrentMatchupOdd && nextMatchup.creature2.creatureId === creature.creatureId) {
          nextMatchup.creature2 = null;
        } else if (nextMatchup.creature1.creatureId === creature.creatureId) {
          nextMatchup.creature1 = null;
        }

        matchup = nextMatchup;
      } else {
        break;
      }
    }
  }
}
