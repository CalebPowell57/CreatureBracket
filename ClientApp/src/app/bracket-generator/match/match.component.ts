import { Component, Input } from '@angular/core';
@Component({
  selector: 'tt-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent {

  @Input() matchups: any;

  private creatureVotedFor = '';
}
