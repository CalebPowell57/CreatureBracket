import { Component, Input, SimpleChange } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgttTournament } from '../../interfaces/bracket.interface';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';

@Component({
  selector: 'app-global-bracket',
  templateUrl: './global-bracket.component.html',
  styleUrls: ['./global-bracket.component.scss']
})
export class GlobalBracketComponent  {

  constructor(
    private router: Router) { }


  public singleEliminationTournament: NgttTournament;

  onSubmit(form: NgForm) {
  }
  ngOnInit() {
    this.singleEliminationTournament = {
      rounds: [
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
            },
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
            },
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
            },
            {
              teams: [{ name: 'Team  B', score: 1 }, { name: 'Team  D', score: 2 }]
            },
            {
              teams: [{ name: 'Team  F', score: 1 }, { name: 'Team  H', score: 2 }]
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
      ]
    }
  }
  public onClick(match: any) {
    let creature: ICreatureDTO = {
      name: match.teams[0].name,
      score: match.teams[0].score
    };

    console.log(creature);
    
  }

}
