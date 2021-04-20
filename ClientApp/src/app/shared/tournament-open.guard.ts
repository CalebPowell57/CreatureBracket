import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { EStatus } from '../interfaces/bracket.interface';
import { GlobalBracketService } from './global-bracket.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentOpenGuard implements CanActivate {
  constructor(private router: Router,
    private bracketService: GlobalBracketService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.bracketService.activeBracketStatus().toPromise()
      .then(statusDTO => {
        if (statusDTO.status === EStatus.Open) {
          return true;
        } else {
          this.router.navigate(['not-found']);

          return false;
        }
      });
  }
}
