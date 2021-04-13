import { Component, OnInit } from '@angular/core';
import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalBracketService } from '../shared/global-bracket.service';
import { LoadStateService } from '../shared/load-state.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  particalArray = new Array(30);
  ExitImageClicked: boolean;
  bracket: string[] = ['/tournament'];
  pageInitialized: boolean = false;
  constructor(
    private router: Router,
    private bracketService: GlobalBracketService,
    private loadStateService: LoadStateService
  ) { }

  ngOnInit() {
    if (this.loadStateService.HomeHasLoaded) {
      this.pageInitialized = true;
    }
    else {
      this.loadStateService.HomeHasLoaded = true;
    }
    this.bracketService.activeBracket().subscribe(x => {
      if (x.status === 0) {
        this.bracket = ['/creature-submission'];
      }
      else if (x.status === 1) {
        this.bracket = ['/tournament'];
      }
      else {
        this.bracket = ['/current-standings'];
      }
    })
  }

  onStartClick() {
    this.ExitImageClicked = true;
    setTimeout(() => {
      
      this.router.navigate(this.bracket)
    }, 5990)
  }
}
