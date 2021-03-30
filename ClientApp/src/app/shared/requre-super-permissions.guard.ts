import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequireSuperPermissionsGuard implements CanActivate {
  constructor(private router: Router,
    private authService: MsalService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let result = false;

    if (this.authService.getAccount()) {
      const roles = this.authService.getAccount().idTokenClaims.roles;

      if (roles) {
        result = roles.includes('super');

        this.router.navigate(['no-permissions']);
      }
    }

    return result;
  }
}
