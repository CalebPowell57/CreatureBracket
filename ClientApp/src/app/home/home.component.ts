import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NaviService } from '../shared/navi.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  particalArray = new Array(50);
  ExitImageClicked: boolean;
  bracket: string[] = ['/tournament'];
  constructor(private router: Router) {}

  onStartClick() {
    this.ExitImageClicked = true;
    setTimeout(() => {
      
      this.router.navigate(this.bracket)
    }, 5990)
  }
}
