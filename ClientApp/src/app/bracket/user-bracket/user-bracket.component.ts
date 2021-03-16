import { ChangeDetectorRef, Component, Output } from '@angular/core';

@Component({
  selector: 'app-user-bracket',
  templateUrl: './user-bracket.component.html',
  styleUrls: ['./user-bracket.component.scss']
})
export class UserBracketComponent {
  @Output() userBracketFlag: boolean;
  ngOnInit() {
    this.userBracketFlag = true;
  }

  saveBracketRankings(event) {
    console.log(event);
  }
}


