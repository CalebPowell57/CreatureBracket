import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showCreatureSubmission: Observable<boolean>;
  showGlobalBracket: Observable<boolean>;
  showFinalStandings: Observable<boolean>;

  constructor() {
    this.showCreatureSubmission = of(true);
    this.showGlobalBracket = of(false);
    this.showFinalStandings = of(false);
  }

  ngOnInit(): void {
  }
}
