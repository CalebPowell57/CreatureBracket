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

  constructor(private naviService: NaviService) {}

  ngOnInit() {
    this.naviService.loadingChanged$.subscribe(x => {
      //if (!x) {
      //  setTimeout(null, 1000);
      //}

      this.show = x;
    });
  }
}
