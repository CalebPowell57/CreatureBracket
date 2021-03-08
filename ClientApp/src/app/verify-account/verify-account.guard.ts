import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyAccountGuard implements CanActivate {
  constructor(private router: Router,
    private toastrService: ToastrService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (next.params['emailAddress'] && next.params['verifyGuid']) {
      return true;
    } else {
      this.toastrService.error('Invalid parameters.', 'Routing error');

      return false;
    }
  }
}
