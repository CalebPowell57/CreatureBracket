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
  @Output() selectedAnimationClass: string;
  @Output() userBracketSaveEvent: EventEmitter<any> = new EventEmitter();
  @Input() isGlobal: boolean;

  colActive = false;
  contentColumnCommand: string;
  isColInit = false;

  constructor(
    private bracketService: GlobalBracketService,
    private router: Router,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.isGlobal) {
      this.bracketService.getBracketData().subscribe(data => {
        this.singleEliminationTournament = data;
        if (this.singleEliminationTournament.rounds[0].matchups.length >= 16) {
          this.zoomOut(40);
        }
        else {
          this.zoomOut(undefined);
        }
      });
    } else {
      this.bracketService.getMyBracket().subscribe(data => {
        this.singleEliminationTournament = data;
        if (this.singleEliminationTournament.rounds[0].matchups.length >= 16) {
          this.zoomOut(40);
        }
        else {
          this.zoomOut(undefined);
        }
      });
    }
    this.discussionCreatureColumnState("pageLoad");
  }
  public onMatchClick(matchup: any) {
    this.discussionCreatureColumnState("CreatureInformation");
    this.cdr.detectChanges();
    this.passMatch.next(matchup);

  }
  public onchatClick() {
    this.discussionCreatureColumnState("Discussion");
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

  public discussionCreatureColumnState(contentRequested: string) {
    if (this.selectedComponent === contentRequested && contentRequested != "CreatureInformation") {
      this.contentColumnCommand = "closeColumn"
      this.colActive = false;
      this.isColInit = true;
      this.selectedComponent = "";
    }
    else if (contentRequested === "pageLoad") {
      this.colActive = false;
      this.contentColumnCommand = contentRequested;
      this.isColInit = true;
    }
    else if (this.isColInit === true) {
      this.colActive = true;
      this.contentColumnCommand = "content";
      this.selectedComponent = contentRequested;
      this.selectedAnimationClass = "init";
      this.isColInit = false;
    }
    else {
      this.colActive = true;
      this.contentColumnCommand = "content";
      this.selectedComponent = contentRequested;
      this.selectedAnimationClass = contentRequested;
    }
  }
}
