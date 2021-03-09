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
    this.bracketService.getBracketData().subscribe(data => {
      this.singleEliminationTournament = data;
    });
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
