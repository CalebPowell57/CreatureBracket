import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class NotSignedInGuard implements CanActivate {
  constructor(private router: Router,
    private authService: MsalService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.acquireTokenSilent({ scopes: ["profile", "openid"] })
      .then(tokenResponse => {
        this.router.navigate(['']);
        return false;
      })
      .catch(error => {
        if (error.errorCode === 'user_login_error' || error.errorCode === 'token_renewal_error' || error.errorCode === 'login_required') {//duplicate check in error.handler.ts
          return true;
        } else {
          throw error;
        }
      });
  }
}
