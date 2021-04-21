import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { Subject } from 'rxjs';
import { IGlobalBracketDTO } from '../../../interfaces/GlobalBracketDTO.interface';
import { IGlobalCreatureDTO } from '../../../interfaces/GlobalCreatureDTO.interface';
import { IGlobalRoundDTO } from '../../../interfaces/GlobalRoundDTO.interface';

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
  @Input() tournament: any;
  @Input() isGlobal: boolean;
  @Input('zoomInOut') zoomInOut: any;
  @Input() matchupUpdated: Subject<string>;

  public rounds: IGlobalRoundDTO[] = [];
  public final: IGlobalRoundDTO = { matchups: [], rank: 0 };

  winner: IGlobalCreatureDTO;

  ngOnInit() {
    this.matchupUpdated.subscribe(x => {
      const finalMatchup = this.tournament.rounds[this.tournament.rounds.length - 1].matchups[0];

      if (finalMatchup.creature1 && finalMatchup.creature1.winner) {
        this.winner = finalMatchup.creature1;
      } else if (finalMatchup.creature2 && finalMatchup.creature2.winner) {
        this.winner = finalMatchup.creature2;
      } else {
        this.winner = null;
      }
    });
  }

  startConfetti() {
    if (!this.isGlobal) {
      return;
    }

    const canvas = document.getElementById('my-canvas');

    if (canvas) {
      var launchConfetti = confetti.create(canvas, { resize: true });

      var colors = ['#f54242', '#f5d742', '#499bd1', '#7eb812', '#ffffff'];

      let start;

      (function frame(timestamp) {
        if (start === undefined)
          start = timestamp;
        const elapsed = timestamp - start;

        if (elapsed > 100) {
          launchConfetti({
            particleCount: 5,
            angle: 75,
            spread: 35,
            origin: { x: 0, y: .8 },
            colors: colors,
            startVelocity: 30
          });
          launchConfetti({
            particleCount: 5,
            angle: 105,
            spread: 35,
            origin: { x: 1, y: .8 },
            colors: colors,
            startVelocity: 30
          });

          start = undefined;
        }

        requestAnimationFrame(frame);
      }());
    } else {
      setTimeout(this.startConfetti, 150);
    }
  }

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
          const matchup : any = round.matchups[0];

          if (this.isGlobal) {
            const winnerArray = matchup.contestants.filter(creature => creature.winner)

            if (winnerArray.length > 0) {
              this.winner = winnerArray[0];

              //const wrapper = document.getElementById('wrapper');

              //wrapper.addEventListener('animationend', this.startConfetti);//only start for global
            }
          } else {
            if (matchup.creature1 && matchup.creature1.winner) {
              this.winner = matchup.creature1;
            } else if (matchup.creature2 && matchup.creature2.winner) {
              this.winner = matchup.creature2;
            }
          }

          return round;
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
    if (!this.zoomInEnabled) {
      return;
    }

    this.zoomOutEnabled = true;

    this.zoom += 20;

    this.bracketStyle = {
      zoom: `${this.zoom}%`
    };

    if (this.zoom === 200) {
      this.zoomInEnabled = false;
    }
  }

  zoomOut(zoomInit: number) {
    if (!this.zoomOutEnabled) {
      return;
    }

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

    if (this.zoom === 20) {
      this.zoomOutEnabled = false;
    }
  }
}

