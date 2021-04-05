import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
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

  creatureVotedForId: string;

  public constructor(
    private matchService: MatchService,
    private cdr: ChangeDetectorRef,
    private authService: MsalService) { }

  ngOnInit() {
    if (this.matchup.vote) {
      this.creatureVotedForId = this.matchup.vote.creatureId;
    }
  }

  vote(creature: any) {
    const account = this.authService.getAccount();

    let voteId = this.matchup.vote === null ? Guid.create().toString() : this.matchup.vote.voteId;

    let vote: IVote = {
      CreatureId: creature.creatureId,
      Id: voteId,
      MatchupId: this.matchup.matchupId,
      UserName: account.userName
    };

    this.matchup.vote = { voteId: vote.Id, creatureId: creature.creatureId };

    this.matchService.post(vote).subscribe(() => {
      this.creatureVotedForId = creature.creatureId;
      this.cdr.detectChanges();
    });
  }
}
