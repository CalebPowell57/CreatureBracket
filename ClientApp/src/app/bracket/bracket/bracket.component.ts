import { Component, Input, Output, SimpleChange, EventEmitter, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgttRound, NgttTournament } from '../../interfaces/bracket.interface';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { GlobalBracketService } from '../../shared/global-bracket.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent {
  zoomInEnabled = false;
  zoomOutEnabled = true;
  zoom = 100;
  bracketStyle = {
    zoom: '100%'
  };

  public BracketData: NgttRound;
  public singleEliminationTournament: NgttTournament;
  @Input() userBracketFlag: boolean;
  @Output() passMatch: Subject<any> = new Subject();
  @Output() selectedComponent: string;
  @Output() userBracketSaveEvent: EventEmitter<any> =  new EventEmitter();
  colActive = false;
 

  constructor(
    private bracketService: GlobalBracketService,
    private router: Router,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.bracketService.getBracketData().subscribe(data => {
      this.singleEliminationTournament = data;
      if (this.userBracketFlag === undefined) {
        this.userBracketFlag = false;
      }
      if (this.singleEliminationTournament.rounds[0].matchups.length >= 16) {
        this.zoomOut(40);
      }
      else {
        this.zoomOut(undefined);
      }
    });
  }
  public onMatchClick(matchup: any) {
    this.selectedComponent = "CreatureInformation";
    this.colActive = true;
    this.cdr.detectChanges();
    this.passMatch.next(matchup);

  }
  public onchatClick() {
    if (this.colActive === false || this.selectedComponent != "Discussion") {
      this.selectedComponent = "Discussion";
      this.colActive = true;
    }
    else {
      this.selectedComponent = "";
      this.colActive = false;
    }
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

  zoomOut(zoomInit: number) {
    this.zoomInEnabled = true;
    if (zoomInit === undefined) {
      this.zoom -= 20;
    }
    else {
      this.zoom -= zoomInit;
    }

    this.bracketStyle = {
      zoom: `${this.zoom}%`
    };

    if (this.zoom === 40) {
      this.zoomOutEnabled = false;
    }
  }

  userBracketSaveClick() {
    this.userBracketSaveEvent.emit("Save Clicked");
  }
}
