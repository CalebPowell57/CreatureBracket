import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EStatus } from '../interfaces/bracket.interface';
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
  bracket: string[] = [''];
  pageInitialized: boolean = false;
  hasActiveBracket = false;
  constructor(
    private router: Router,
    private bracketService: GlobalBracketService,
    private loadStateService: LoadStateService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    if (this.loadStateService.HomeHasLoaded) {
      this.pageInitialized = true;
    }
    else {
      this.loadStateService.HomeHasLoaded = true;
    }
    this.bracketService.activeBracketStatus().subscribe(x => {
      if (!x) {
        this.hasActiveBracket = false;

        return;
      } else {
        this.hasActiveBracket = true;
      }

      if (x.status === EStatus.Open) {
        this.bracket = ['/creature-submission'];
      }
      else if (x.status === EStatus.Started) {
        this.bracket = ['/tournament'];
      }
      else {
        this.bracket = ['/current-standings'];
      }
    })
  }

  onStartClick() {
    if (!this.hasActiveBracket) {
      this.toastrService.warning('Wait for a tournament organizer to start a bracket.', 'Attention');

      return;
    }

    this.ExitImageClicked = true;
    setTimeout(() => {
      
      this.router.navigate(this.bracket)
    }, 5990)
  }
}
