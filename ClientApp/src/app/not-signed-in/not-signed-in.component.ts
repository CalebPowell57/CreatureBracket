import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  templateUrl: './not-signed-in.component.html',
  styleUrls: ['./not-signed-in.component.scss']
})
export class NotSignedInComponent {
  constructor(private authService: MsalService) {}

  signIn() {
    this.authService.loginRedirect({
      extraScopesToConsent: ["user.read", "openid", "profile", "user.readbasic.all"]
    });
  }
}
