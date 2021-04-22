import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { EStatus, IBracket } from '../interfaces/bracket.interface';
import { BracketManagerService } from './bracket-manager.service';

@Component({
  selector: 'app-bracket-manager',
  templateUrl: './bracket-manager.component.html',
  styleUrls: ['./bracket-manager.component.scss']
})
export class BracketManagerComponent {
  brackets: IBracket[];
  filteredBrackets: IBracket[];

  _filterText: string;
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;

    this.filteredBrackets = this.filterText ? this.filterBrackets(this.filterText) : this.brackets;
  }

  constructor(
    private bracketService: BracketManagerService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.bracketService.getItems().subscribe(result => {
      this.brackets = result;

      this.filteredBrackets = this.brackets;
    });
  }

  filterBrackets(text: string): IBracket[] {
    return this.brackets.filter((bracket: IBracket) =>
      bracket.title.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1);
  }

  onAddButtonClick() {
    let title = 'New Bracket';
    let index = 0;

    while (this.brackets.some(x => x.title === title)) {
      title = `New Bracket (${index})`;

      index++;
    }

    const newBracket: IBracket = {
      id: Guid.create().toString(),
      bracketSubmissionDeadline: null,
      completedDateTime: null,
      status: EStatus.Open,
      title: title,
      winnerId: null
    };

    this.bracketService.postItem(newBracket).subscribe(x => {
      this.brackets.push(newBracket);

      this.filterText = '';
    });
  }

  onTitleFocusLost(bracketChanged: IBracket) {
    this.bracketService.postItem(bracketChanged).subscribe();//really should add an update title endpoint
  }

  onDeleteButtonClick(bracketSelected: IBracket) {
    if (confirm('Are you sure you want to delete ' + bracketSelected.title + '?')) {
      this.bracketService.deleteItem(bracketSelected.id).subscribe(result => {
        this.brackets = this.brackets.filter(item => item !== bracketSelected);

        this.filterText = this.filterText;

        bracketSelected = this.filteredBrackets[0];
      });
    }
  }
}
