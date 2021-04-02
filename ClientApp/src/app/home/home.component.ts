import { Component } from '@angular/core';
import { EStatus } from '../interfaces/bracket.interface';
import { GlobalBracketService } from '../shared/global-bracket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showCreatureSubmission = false;
  showGlobalBracket = false;
  showFinalStandings = false;
  showNoActiveBracket = false;

  constructor(private bracketService: GlobalBracketService) {}


  ngOnInit(): void {
    this.bracketService.activeBracket().subscribe(activeBracket => {
      if (activeBracket) {
        this.showCreatureSubmission = activeBracket.status === EStatus.Started;
        this.showGlobalBracket = activeBracket.status === EStatus.Open;
        //this.showFinalStandings = activeBracket.status === EStatus.Completed;
      } else {
        this.showNoActiveBracket = true;
      }
    });
  }
}


