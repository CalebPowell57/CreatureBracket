import { Component, EventEmitter, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { IUserBracketDTO } from '../../../interfaces/UserBracketDTO.interface';
import { IUserRoundDTO } from '../../../interfaces/UserRoundDTO.interface';

@Component({
  selector: 'ngtt-single-elimination-tree',
  templateUrl: './single-elimination-tree.component.html',
  styleUrls: ['./single-elimination-tree.component.scss']
})
export class SingleEliminationTreeComponent implements OnChanges {

  zoomInEnabled = false;
  zoomOutEnabled = true;
  zoom = 100;
  bracketStyle = {
    zoom: '100%'
  };

  @Input() matchTemplate: TemplateRef<any>;
  @Input() tournament: IUserBracketDTO;
  @Input() isGlobal: boolean;
  @Input('zoomInOut') zoomInOut: any;

  public rounds: IUserRoundDTO[] = [];
  public final: IUserRoundDTO = { matchups: [], rank: 0 };


  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('tournament') && changes.tournament.currentValue) {
      this.rounds = this.tournament.rounds.filter(round => {
        if (round.matchups.length > 1) {
          return round;
        }
        if (this.tournament.rounds[0].matchups.length >= 16) {
          this.zoomOut(40);
        }
        else {
          this.zoomOut(undefined);
        }
      });
      this.final = this.tournament.rounds.filter(round => {
        if (round.matchups.length === 1) {
          return round
        }
      }).shift();
    }
    if (changes.zoomInOut != null) {
      if (changes.zoomInOut.currentValue && changes.zoomInOut.currentValue.Command != undefined) {
        if (this.zoomInOut.Command === "ZoomIn") {
          this.zoomIn();
        }
        else if (this.zoomInOut.Command === "ZoomOut") {
          this.zoomOut(undefined);
        }
      }
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

