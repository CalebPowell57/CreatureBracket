import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgttTournament } from '../interfaces/bracket.interface';

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

  public singleEliminationTournament: NgttTournament;


  ngOnInit() {
    this.singleEliminationTournament = {rounds};
  }
}

let rounds: any[] = [
  {
    type: 'Winnerbracket',
    matches: [
      {
        teams: [{ name: 'Team  A', score: 1 }, { name: 'Team  B', score: 2 }]
      },
      {
        teams: [{ name: 'Team  C', score: 1 }, { name: 'Team  D', score: 2 }]
      },
      {
        teams: [{ name: 'Team  E', score: 1 }, { name: 'Team  F', score: 2 }]
      },
      {
        teams: [{ name: 'Team  G', score: 1 }, { name: 'Team  H', score: 2 }]
      }, {
        teams: [{ name: 'Team  A', score: 1 }, { name: 'Team  B', score: 2 }]
      },
      {
        teams: [{ name: 'Team  C', score: 1 }, { name: 'Team  D', score: 2 }]
      },
      {
        teams: [{ name: 'Team  E', score: 1 }, { name: 'Team  F', score: 2 }]
      },
      {
        teams: [{ name: 'Team  G', score: 1 }, { name: 'Team  H', score: 2 }]
      }
    ]
  }, {
    type: 'Winnerbracket',
    matches: [
      {
        teams: [{ name: 'Team  A', score: 1 }, { name: 'Team  B', score: 2 }]
      },
      {
        teams: [{ name: 'Team  C', score: 1 }, { name: 'Team  D', score: 2 }]
      },
      {
        teams: [{ name: 'Team  E', score: 1 }, { name: 'Team  F', score: 2 }]
      },
      {
        teams: [{ name: 'Team  G', score: 1 }, { name: 'Team  H', score: 2 }]
      }
    ]
  },
  {
    type: 'Winnerbracket',
    matches: [
      {
        teams: [{ name: 'Team  B', score: 1 }, { name: 'Team  D', score: 2 }]
      },
      {
        teams: [{ name: 'Team  F', score: 1 }, { name: 'Team  H', score: 2 }]
      }
    ]
  },
  {
    type: 'Final',
    matches: [
      {
        teams: [
          {
            name: 'Team  D',
            score: 1
          },
          {
            name: 'Team  H',
            score: 2
          }
        ]
      }
    ]
  }
];

