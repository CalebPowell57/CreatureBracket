import { Component } from '@angular/core';
import { EStatus } from '../interfaces/bracket.interface';
import { AuthenticationService } from '../shared/authentication.service';
import { GlobalBracketService } from '../shared/global-bracket.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  showCreatureApproval = true;

  constructor(
    private authenticationService: AuthenticationService,
    private bracketService: GlobalBracketService) { }

  ngOnInit() {
    this.bracketService.activeBracket().subscribe(x => {
      this.showCreatureApproval = x.status === EStatus.Open;//add permissions check as well
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
