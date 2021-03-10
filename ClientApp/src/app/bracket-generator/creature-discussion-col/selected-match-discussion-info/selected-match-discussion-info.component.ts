import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ICreatureDTO } from '../../../interfaces/CreatureDTO.interface';
@Component({
  selector: 'app-selected-match-discussion-info',
  templateUrl: './selected-match-discussion-info.component.html',
  styleUrls: ['./selected-match-discussion-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedMatchDiscussionInfoComponent {
  constructor(private cdr: ChangeDetectorRef) { }
  @Input() selectedMatch: Subject<any>;
  public creature1: ICreatureDTO;
  public creature2: ICreatureDTO;

  ngOnInit() {
    this.selectedMatch.subscribe(event => {
      this.creature1 = {
        Name: event.contestants[0].name,
        Bio: event.contestants[0].bio
      }
      this.creature2 = {
        Name: event.contestants[1].name,
        Bio: event.contestants[1].bio
      }
      this.cdr.detectChanges();
    })
  }


  ngOnDestroy(){
    this.selectedMatch.unsubscribe();
  } 
}
