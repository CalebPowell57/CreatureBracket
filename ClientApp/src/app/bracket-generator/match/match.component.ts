import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'tt-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() matchups: any;

  constructor() { }

  ngOnInit() {
  }

}
