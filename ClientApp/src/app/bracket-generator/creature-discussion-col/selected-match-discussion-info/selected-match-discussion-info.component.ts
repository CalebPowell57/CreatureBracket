import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
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
  @Input() creature1: ICreatureDTO;
  @Input() creature2: ICreatureDTO;

  ngOnInit() {
  }
}
