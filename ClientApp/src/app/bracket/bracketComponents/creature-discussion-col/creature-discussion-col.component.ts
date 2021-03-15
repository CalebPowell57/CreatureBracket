import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ICreatureDTO } from '../../../interfaces/CreatureDTO.interface'

@Component({
  selector: 'app-creature-discussion-col',
  templateUrl: './creature-discussion-col.component.html',
  styleUrls: ['./creature-discussion-col.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(50%)' })),
      state('right', style({ transform: 'translateX(100%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class CreatureDiscussionColComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  @Input() passMatch: Subject<any>;
  @Input() selectedComponent: string;
  @Output() selectedMatch: Subject<any> = new Subject();
  @Output() creature1: ICreatureDTO;
  @Output() creature2: ICreatureDTO;


  ngOnInit() {
    this.passMatch.subscribe(event => {
      this.selectedMatch.subscribe(event => {
        this.creature1 = {
          Name: event.contestants[0].name,
          Bio: event.contestants[0].bio,
          Image: event.contestants[0].image
        }
        this.creature2 = {
          Name: event.contestants[1].name,
          Bio: event.contestants[1].bio,
          Image: event.contestants[1].image
        }
      })
      this.selectedMatch.next(event);
    })
  }
  ngOnDestroy() {
    this.selectedMatch.unsubscribe();
  } 

}
