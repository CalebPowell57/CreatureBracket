import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ICreatureDTO } from '../../../interfaces/CreatureDTO.interface';

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
  constructor(private cdr: ChangeDetectorRef) { }
  @Input() passMatch: Subject<any>;
  @Input() selectedComponent: string;
  @Input() selectedAnimationClass: string;
  @Input() isGlobal: boolean;
  @Output() selectedMatch: Subject<any> = new Subject();
  @Output() creature1: ICreatureDTO;
  @Output() creature2: ICreatureDTO;


  ngOnInit() {
    this.passMatch.subscribe(event => {
      this.selectedMatch.subscribe(matchup => {
        if (this.isGlobal) {
          this.creature1 = {
            Name: matchup.contestants[0].name,
            Bio: matchup.contestants[0].bio,
            Image: matchup.contestants[0].image
          }
          this.creature2 = {
            Name: matchup.contestants[1].name,
            Bio: matchup.contestants[1].bio,
            Image: matchup.contestants[1].image
          }
        } else {
          this.creature1 = {
            Name: matchup.creature1.name,
            Bio: matchup.creature1.bio,
            Image: matchup.creature1.image
          };

          this.creature2 = {
            Name: matchup.creature2.name,
            Bio: matchup.creature2.bio,
            Image: matchup.creature2.image
          };
        }
      })
      this.selectedMatch.next(event);
    })
  }
  ngOnDestroy() {
    this.selectedMatch.unsubscribe();
  }

}
