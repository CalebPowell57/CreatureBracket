import { Component, Output } from '@angular/core';
import { NaviService } from '../../shared/navi.service';

@Component({
  selector: 'app-user-bracket',
  templateUrl: './user-bracket.component.html',
  styleUrls: ['./user-bracket.component.scss']
})
export class UserBracketComponent {
  @Output() userBracketFlag: boolean;

  constructor(private naviService: NaviService) {}

  ngOnInit() {
    this.userBracketFlag = true;
    this.naviService.loadingChanged$.next(false);
  }

  saveBracketRankings(event) {
    console.log(event);
  }
}


