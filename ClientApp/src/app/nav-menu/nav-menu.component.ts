import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { EStatus } from '../interfaces/bracket.interface';
import { AccountService } from '../shared/account.service';
import { GlobalBracketService } from '../shared/global-bracket.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  showCreatureApproval = false;
  showBracketManager = false;
  signedInUser = '';
  signedInUserImage = '';

  constructor(
    private bracketService: GlobalBracketService,
    private authService: MsalService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.signedInUser = this.authService.getAccount().name;
    this.accountService.getInformation().subscribe(x => {
      this.signedInUserImage = x.image;
    });

    this.bracketService.activeBracket().subscribe(x => {
      if (this.authService.getAccount()) {
        const roles = this.authService.getAccount().idTokenClaims.roles;

        if (roles) {
          this.showCreatureApproval = roles.includes('super') && x.status === EStatus.Open;
          this.showBracketManager = roles.includes('super');
        }
      } else {
        this.showCreatureApproval = x.status === EStatus.Open;
      }
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signOut() {
    this.authService.logout();
  }
}
