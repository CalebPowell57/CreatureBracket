import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { NgttRound, NgttTournament } from '../../interfaces/bracket.interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalBracketService } from '../../shared/global-bracket.service';

@Component({
  selector: 'app-user-bracket',
  templateUrl: './user-bracket.component.html',
  styleUrls: ['./user-bracket.component.scss'],
})
export class UserBracketComponent {
  zoomInEnabled = false;
  zoomOutEnabled = true;
  zoom = 100;
  bracketStyle = {
    zoom: '100%'
  };

  public BracketData: NgttRound;
  public singleEliminationTournament: NgttTournament;

  @Output() passMatch: Subject<any> = new Subject();
  @Output() selectedComponent: string;
  colActive = false;


  constructor(
    private bracketService: GlobalBracketService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.bracketService.getBracketData().subscribe(data => {
      this.singleEliminationTournament = data;
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
}


