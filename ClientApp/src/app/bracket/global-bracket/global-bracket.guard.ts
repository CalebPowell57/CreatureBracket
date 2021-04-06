import { Injectable, Output } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalBracketService } from '../../shared/global-bracket.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalBracketGuard implements CanActivate {
  constructor(
    private router: Router,
    private globalBracketService: GlobalBracketService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
