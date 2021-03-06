import { Component, Input, SimpleChange } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgttRound, NgttTournament } from '../../interfaces/bracket.interface';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { GlobalBracketService } from '../../shared/global-bracket.service';

@Component({
  selector: 'app-global-bracket',
  templateUrl: './global-bracket.component.html',
  styleUrls: ['./global-bracket.component.scss']
})
export class GlobalBracketComponent  {

  constructor(
    private bracketService: GlobalBracketService,
    private router: Router) { }

  public BracketData: NgttRound;
  public singleEliminationTournament: NgttTournament; 

  onSubmit(form: NgForm) {
  }
  ngOnInit() {
    this.bracketService.getBracketData()
      .subscribe(data => this.singleEliminationTournament = data);

    console.log(this.singleEliminationTournament);
    //this.singleEliminationTournament = this.BracketData;
    //this.singleEliminationTournament = {
    //  rounds: [
    //    {
    //      type: 'Winnerbracket',
    //      matchups: [
    //        {
    //          contestants: [{ name: 'Creature  A', votes: 1 }, { name: 'Creature  B', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  C', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  E', votes: 1 }, { name: 'Creature  F', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  G', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  A', votes: 1 }, { name: 'Creature  B', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  C', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  E', votes: 1 }, { name: 'Creature  F', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  G', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  A', votes: 1 }, { name: 'Creature  B', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  C', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  E', votes: 1 }, { name: 'Creature  F', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  G', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  A', votes: 1 }, { name: 'Creature  B', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  C', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  E', votes: 1 }, { name: 'Creature  F', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  G', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        }
    //      ]
    //    }, {
    //      type: 'Winnerbracket',
    //      matchups: [
    //        {
    //          contestants: [{ name: 'Creature  A', votes: 1 }, { name: 'Creature  B', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  C', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  E', votes: 1 }, { name: 'Creature  F', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  G', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  A', votes: 1 }, { name: 'Creature  B', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  C', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  E', votes: 1 }, { name: 'Creature  F', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  G', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        }
    //      ]
    //    },
    //    {
    //      type: 'Winnerbracket',
    //      matchups: [
    //        {
    //          contestants: [{ name: 'Creature  B', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  F', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  B', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  F', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        }
    //      ]
    //    },
    //    {
    //      type: 'Winnerbracket',
    //      matchups: [
    //        {
    //          contestants: [{ name: 'Creature  B', votes: 1 }, { name: 'Creature  D', votes: 2 }]
    //        },
    //        {
    //          contestants: [{ name: 'Creature  F', votes: 1 }, { name: 'Creature  H', votes: 2 }]
    //        }
    //      ]
    //    },
    //    {
    //      type: 'Final',
    //      matchups: [
    //        {
    //          contestants: [
    //            {
    //              name: 'Creature  D',
    //              votes: 1
    //            },
    //            {
    //              name: 'Creature  H',
    //              votes: 2
    //            }
    //          ]
    //        }
    //      ]
    //    }
    //  ]
    //}
  }
  public onClick(match: any) {
    let creatures: ICreatureDTO[] = [];
    for (let i = 0; i < 2; i++) {
      let CreatureInBattle: ICreatureDTO = {
        creatureName: match.contestants[i].name,
        votes: match.contestants[i].votes
      }
      creatures.push(CreatureInBattle);
    }; 
  }

}
