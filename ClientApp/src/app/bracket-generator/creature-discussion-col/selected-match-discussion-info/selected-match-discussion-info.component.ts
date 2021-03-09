import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ICreatureDTO } from '../../../interfaces/CreatureDTO.interface';
@Component({
  selector: 'app-selected-match-discussion-info',
  templateUrl: './selected-match-discussion-info.component.html',
  styleUrls: ['./selected-match-discussion-info.component.scss']
})
export class SelectedMatchDiscussionInfoComponent implements OnInit {

  @Input() creature: ICreatureDTO;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {

  }

}
