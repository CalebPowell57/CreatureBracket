import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBracket } from '../interfaces/bracket.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalBracketService {
  constructor(private http: HttpClient) {
  }

  activeBracket() : Observable<IBracket> {
    return this.http.get<IBracket>('Bracket/Active');
  }
}
