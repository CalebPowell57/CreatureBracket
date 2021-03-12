import { Component, Input, Output, SimpleChange, EventEmitter, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgttRound, NgttTournament } from '../../interfaces/bracket.interface';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { GlobalBracketService } from '../../shared/global-bracket.service';

@Component({
  selector: 'app-global-bracket',
  templateUrl: './global-bracket.component.html',
  styleUrls: ['./global-bracket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalBracketComponent {
  zoomInEnabled = false;
  zoomOutEnabled = true;
  zoom = 100;
  bracketStyle = {
    zoom: '100%'
  };

  constructor(
    private bracketService: GlobalBracketService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  public BracketData: NgttRound;
  public singleEliminationTournament: NgttTournament;

  //@Output() creature1: ICreatureDTO;
  //@Output() creature2: ICreatureDTO;
  @Output() passMatch: Subject<any> = new Subject();
  @Output() selectedComponent: string;
  colActive = false;

  ngOnInit() {
    this.bracketService.getBracketData().subscribe(data => {
      this.singleEliminationTournament = data;
    });
  }
  public onClick(matchup: any) {
    this.selectedComponent = "CreatureInformation";
    this.colActive = true;
    this.cdr.detectChanges();
    this.passMatch.next(matchup);

  }
  public chatClick() {
    this.selectedComponent = "Discussion";
    this.colActive = true;
  }

  zoomIn() {
    this.zoomOutEnabled = true;

    this.zoom += 20;

    this.bracketStyle = {
      zoom: `${this.zoom}%`
    };

    if (this.zoom === 100) {
      this.zoomInEnabled = false;
    }
  }

  zoomOut() {
    this.zoomInEnabled = true;

    this.zoom -= 20;

    this.bracketStyle = {
      zoom: `${this.zoom}%`
    };

    if (this.zoom === 40) {
      this.zoomOutEnabled = false;
    }
  }
}
