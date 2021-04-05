import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-information',
  templateUrl: './welcome-information.component.html',
  styleUrls: ['./welcome-information.component.scss']
})
export class WelcomeInformationComponent implements OnInit {
  particalArray = new Array(25);
  constructor() { }

  ngOnInit() {
  }

}
