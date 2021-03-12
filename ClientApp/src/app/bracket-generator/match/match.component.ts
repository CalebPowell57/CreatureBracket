import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'tt-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
    ])
  ]
})
export class MatchComponent implements OnInit {

  @Input() matchups: any;

  constructor() { }
  show = false;

  ngOnInit() {
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }
  toggle() {
    this.show = !this.show;
  }
}
