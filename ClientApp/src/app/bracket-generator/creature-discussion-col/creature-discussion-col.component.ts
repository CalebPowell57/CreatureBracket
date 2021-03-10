import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';

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
export class CreatureDiscussionColComponent implements OnInit {

  @Input() activePane: PaneType = 'left';

  constructor() { }

  ngOnInit() {
  }

}
type PaneType = 'left' | 'right';
