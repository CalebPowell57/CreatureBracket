import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showCreatureSubmission: Observable<boolean>;
  showGlobalBracket = false;
  showFinalStandings = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
