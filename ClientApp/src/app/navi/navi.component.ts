import { Component } from '@angular/core';
import { NaviService } from '../shared/navi.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent  {
  particles = new Array(15);
  show = false;
  moveClass = '';

  constructor(private naviService: NaviService) {}

  ngOnInit() {
    this.naviService.loadingChanged$.subscribe(x => {
      this.moveClass = x ? 'navi-move-in' : 'navi-move-out';

      if (!x) {
        setTimeout(() => { this.show = x; }, 1100);
      } else {
        this.show = x;
      }
    });
  }
}
