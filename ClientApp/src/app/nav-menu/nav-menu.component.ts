import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { EStatus } from '../interfaces/bracket.interface';
import { AccountService } from '../shared/account.service';
import { GlobalBracketService } from '../shared/global-bracket.service';
import { SidebarService } from '../shared/sidebar.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;
  showCreatureApproval = false;
  showCreatureSubmission = false;
  showBracketManager = false;
  showSeedTournament = false;
  showStandings = false;
  showMyBracket = false;
  showGlobalBracket = false;
  signedInUser = '';
  signedInUserImage = '';

  constructor(
    private bracketService: GlobalBracketService,
    private authService: MsalService,
    private accountService: AccountService,
    private router: Router,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    const account = this.authService.getAccount();

    if (account) {
      this.signedInUser = account.name;
      this.accountService.getInformation().subscribe(x => {
        this.signedInUserImage = x.image;
      });
    }

    this.bracketService.activeBracketStatus().subscribe(x => {
      if (!x) {
        return;
      }

      if (account) {
        const roles = account.idTokenClaims.roles;
        const isSuper = roles && roles.includes('super');

        this.showCreatureApproval = isSuper && x.status === EStatus.Open;
        this.showSeedTournament = isSuper && x.status === EStatus.Open;
        this.showBracketManager = isSuper;
      }

      this.showCreatureSubmission = x.status === EStatus.Open;
      this.showStandings = x.status !== EStatus.Open;
      this.showMyBracket = x.status !== EStatus.Open;
      this.showGlobalBracket = x.status !== EStatus.Open;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  expandUserOptions() {
    var popup = document.getElementById("userOptionsPopup");
    popup.classList.toggle("show");

    var popup = document.getElementById("userOptionsButton");
    popup.classList.toggle("active");
  }

  openSettings() {
    this.router.navigate(['account-settings']);
  }

  signOut() {
    this.authService.logout();
  }

  signIn() {
    this.authService.loginRedirect({
      extraScopesToConsent: ["user.read", "openid", "profile", "user.readbasic.all"]
    });
  }
  onChangeView() {
    this.sidebarService.onChangeView();
  }
}
