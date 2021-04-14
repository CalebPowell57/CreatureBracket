import { Component } from '@angular/core';
import { NaviService } from '../shared/navi.service';

export enum EState { MovingIn, Idle, MovingOut }

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})

export class NaviComponent  {
  particles = new Array(15);
  showingClass = 'not-showing';
  moveClass = '';
  state = EState.MovingIn;

  constructor(private naviService: NaviService) {}

  ngOnInit() {
    this.naviService.loadingChanged$.subscribe(x => {
      this.moveClass = x ? 'navi-move-in' : 'navi-move-out';
      this.state = x ? EState.MovingIn : EState.MovingOut;

      if (x) {
        this.showingClass = 'showing';
      }
    });
  }

  animationEnd() {
    if (this.state === EState.MovingOut) {
      this.showingClass = 'not-showing';
    }
  }
}
