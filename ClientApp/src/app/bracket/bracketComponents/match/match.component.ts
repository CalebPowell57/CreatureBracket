import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Guid } from 'guid-typescript';
import { NgttTournament } from 'ng-tournament-tree';
import { IVote } from '../../../interfaces/vote.interface';
import { MatchService } from './match.service';
@Component({
  selector: 'tt-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent {

  @Input() matchup: any;

  private creatureVotedForId: string;

  public constructor(
    private matchService: MatchService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.matchup.vote) {
      this.creatureVotedForId = this.matchup.vote.creatureId;
    }
  }

  vote(creature: any) {
    let voteId = this.matchup.vote === null ? Guid.create().toString() : this.matchup.vote.voteId;

    let vote: IVote = {
      CreatureId: creature.creatureId,
      Id: voteId,
      MatchupId: this.matchup.matchupId,
      UserId: Guid.parse('54E715D0-2B42-4B19-A36B-E4ADA9DC2594').toString()
    };

    this.matchup.vote = { voteId: vote.Id, creatureId: creature.creatureId };

    this.matchService.post(vote).subscribe(() => {
      this.creatureVotedForId = creature.creatureId;
      this.cdr.detectChanges();
    });
  }
}
