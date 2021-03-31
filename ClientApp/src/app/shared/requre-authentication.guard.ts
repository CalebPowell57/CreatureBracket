import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class RequireAuthenticationGuard implements CanActivate {
  constructor(private router: Router,
    private authService: MsalService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.acquireTokenSilent({ scopes: ["profile", "openid"] })
      .then(tokenResponse => {
        return true;
      })
      .catch(error => {
        if (error.errorCode === 'user_login_error' || error.errorCode === 'token_renewal_error' || error.errorCode === 'login_required') {
          this.authService.loginRedirect({
            extraScopesToConsent: ["user.read", "openid", "profile", "user.readbasic.all"]
          });
        } else {
          console.error(error);
        }

        return false;
      });
  }
}
