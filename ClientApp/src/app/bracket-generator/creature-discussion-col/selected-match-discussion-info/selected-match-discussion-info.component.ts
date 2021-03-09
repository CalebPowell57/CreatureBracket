import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICreatureDTO } from '../../../interfaces/CreatureDTO.interface';
@Component({
  selector: 'app-selected-match-discussion-info',
  templateUrl: './selected-match-discussion-info.component.html',
  styleUrls: ['./selected-match-discussion-info.component.scss']
})
export class SelectedMatchDiscussionInfoComponent  {
  input: discussionEntries = { userDiscussion: '' };
  @Input() creature: ICreatureDTO;

  constructor() { }

  ngOnInit() {
  }
  ngOnSubmit(form: NgForm) {
    //this.userDiscussion = this.input.userDiscussion;
  }

}

interface discussionEntries {
  userDiscussion: string;
}
