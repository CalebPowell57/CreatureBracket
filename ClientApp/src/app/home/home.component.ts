import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EStatus } from '../interfaces/bracket.interface';
import { map } from 'rxjs/operators';
import { GlobalBracketService } from '../shared/global-bracket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showCreatureSubmission = false;
  showGlobalBracket = false;
  showUserBracket = false;
  showFinalStandings = false;
  showNoActiveBracket = false;

  constructor(private bracketService: GlobalBracketService) {}


  ngOnInit(): void {
    this.bracketService.activeBracket().subscribe(activeBracket => {
      if (activeBracket) {
        this.showCreatureSubmission = activeBracket.status === EStatus.Open;
        this.showGlobalBracket = activeBracket.status === EStatus.Started;
        this.showFinalStandings = activeBracket.status === EStatus.Completed;
        //this.showUserBracket = activeBracket.status === EStatus.Started;
      } else {
        this.showNoActiveBracket = true;
      }
    });
  }
}


