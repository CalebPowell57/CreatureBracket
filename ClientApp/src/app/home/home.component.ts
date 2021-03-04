import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgttTournament } from '../interfaces/bracket.interface';
import { map } from 'rxjs/operators';
import { EStatus } from '../interfaces/bracket.interface';
import { GlobalBracketService } from '../shared/global-bracket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showCreatureSubmission = false;
  showGlobalBracket = false;
  showFinalStandings = false;
  showNoActiveBracket = false;

  constructor(private bracketService: GlobalBracketService) {
  }

  public singleEliminationTournament: NgttTournament;

  ngOnInit(): void {
    this.singleEliminationTournament = {rounds};
    this.bracketService.activeBracket().subscribe(activeBracket => {
      if (activeBracket) {
        this.showCreatureSubmission = activeBracket.status === EStatus.Open;
        this.showGlobalBracket = activeBracket.status === EStatus.Started;
        this.showFinalStandings = activeBracket.status === EStatus.Completed;
      } else {
        this.showNoActiveBracket = true;
      }
    });
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

