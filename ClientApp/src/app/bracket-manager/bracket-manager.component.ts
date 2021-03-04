import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { EStatus, IBracket } from '../interfaces/bracket.interface';
import { BracketManagerService } from './bracket-manager.service';

@Component({
  selector: 'app-bracket-manager',
  templateUrl: './bracket-manager.component.html'
})
export class BracketManagerComponent {
  brackets: IBracket[];
  filteredBrackets: IBracket[];
  input: IInput = {
    title: null,
    creatureEntryDeadline: null,
  };
  _selectedBracket: IBracket;
  get selectedBracket(): IBracket {
    return this._selectedBracket;
  }
  set selectedBracket(value: IBracket) {
    this.onBracketSelected(value);
  }
  selectedBracketText = 'No bracket selected';
  isAddingBracket = false;
  showForm = true;

  _filterText: string;
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;

    this.filteredBrackets = this.filterText ? this.filterBrackets(this.filterText) : this.brackets;

    this.selectedBracket = this.filteredBrackets[0];
  }

  constructor(
    private bracketService: BracketManagerService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.bracketService.getItems().subscribe(result => {
      this.brackets = result;

      this.filteredBrackets = this.brackets;

      this.selectedBracket = this.filteredBrackets[0];

      this.isAddingBracket = this.filteredBrackets.length == 0;
    }, error => console.error(error));
  }

  onBracketSelected(selected: IBracket) {
    this.showForm = selected !== null;

    this._selectedBracket = selected;
    this.input = { title: this._selectedBracket.title, creatureEntryDeadline: this._selectedBracket.creatureEntryDeadline };

    this.selectedBracketText = this.selectedBracket ? this.selectedBracket.title : 'No bracket selected';
  }

  filterBrackets(text: string): IBracket[] {
    return this.brackets.filter((bracket: IBracket) =>
      bracket.title.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1);
  }

  onAddButtonClick() {
    this.filterText = '';

    this.input = {
      title: "",
      creatureEntryDeadline: new Date(),
    };

    this.isAddingBracket = true;

    this.showForm = true;
  }

  onCancelButtonClick() {
    this.input = { title: this._selectedBracket.title, creatureEntryDeadline: this._selectedBracket.creatureEntryDeadline };

    this.isAddingBracket = false;
  }

  onSubmit(form: NgForm) {
    var adding = this.isAddingBracket;

    let newBracket: IBracket = {
      creatureEntryDeadline: this.input.creatureEntryDeadline,
      title: this.input.title,
      id: Guid.create(),
      status: EStatus.Open,
      winnerId: null
    };

    if (form.valid) {
      this.bracketService.postItem(newBracket)
        .subscribe(
          result => {
            if (!this.isAddingBracket) {
              this.brackets = this.brackets.filter(bracket => bracket.id !== this.selectedBracket.id);
            }

            this.brackets.unshift(newBracket);

            this.filteredBrackets = [];
            this.filterText = this.filterText;//load filtered brackets now

            this.selectedBracket = newBracket;
          }, error => console.error(error));

      if (adding) {
        this.toastrService.success('Successfully added ' + this.selectedBracket.title, 'Success');
      }
      else {
        this.toastrService.success('Successfully updated ' + this.selectedBracket.title, 'Success');
      }
    }
    else {
      this.toastrService.error('Please fix the errors above', 'Failure');
    }
  }

  onDeleteButtonClick() {
    if (this.selectedBracket && confirm('Are you sure you want to delete ' + this.selectedBracket.title + '?')) {
      this.bracketService.deleteItem(this.selectedBracket.id.toString()).subscribe(result => {
        this.brackets = this.brackets.filter(item => item !== this.selectedBracket);

        this.filterText = this.filterText;

        this.selectedBracket = this.filteredBrackets[0];
      }, error => console.error(error));
    }
  }
}

interface IInput {
  title: string;
  creatureEntryDeadline: Date;
}
