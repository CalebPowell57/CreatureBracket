import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { GlobalBracketComponent } from '../global-bracket/global-bracket.component'
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-creature-discussion-col',
  templateUrl: './creature-discussion-col.component.html',
  styleUrls: ['./creature-discussion-col.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class CreatureDiscussionColComponent {

  @Input() passMatch: Subject<any>;
  @Output() selectedMatch: Subject<any> = new Subject();

  ngOnInit() {
    this.passMatch.subscribe(event => {
      this.selectedMatch.next(event);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
