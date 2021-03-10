import { Component, Input, Output, SimpleChange, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgttRound, NgttTournament } from '../../interfaces/bracket.interface';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { GlobalBracketService } from '../../shared/global-bracket.service';

@Component({
  selector: 'app-global-bracket',
  templateUrl: './global-bracket.component.html',
  styleUrls: ['./global-bracket.component.scss']
})
export class GlobalBracketComponent {

  constructor(
    private bracketService: GlobalBracketService,
    private router: Router) { }

  public BracketData: NgttRound;
  public singleEliminationTournament: NgttTournament;
  public SelectedMatchup: ICreatureDTO[] = [];

  //@Output() passMatch: EventEmitter<any> = new EventEmitter();
  @Output() passMatch: Subject<any> = new Subject();

  ngOnInit() {
    this.bracketService.getBracketData().subscribe(data => {
      this.singleEliminationTournament = data;
    });
  }
  public onClick(matchup: any) {
    this.passMatch.next(matchup);
  }
}
