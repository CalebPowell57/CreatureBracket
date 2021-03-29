import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent {
  constructor(private authService: MsalService) {}

  loginButtonClick() {
    this.authService.loginRedirect({
      extraScopesToConsent: ["user.read", "openid", "profile"]
    });
  }
}
