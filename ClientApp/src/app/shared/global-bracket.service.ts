import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { IBracket, NgttTournament } from '../interfaces/bracket.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalBracketService {
  constructor(private http: HttpClient) {
  }

  activeBracket() : Observable<IBracket> {
    return this.http.get<IBracket>('Bracket/Active');
  }

  getBracketData(): Observable<NgttTournament> {
    let params = new HttpParams().set('userId', Guid.parse('54E715D0-2B42-4B19-A36B-E4ADA9DC2594').toString());

    return this.http.get<NgttTournament>('Bracket/Global', { params: params });
  }
}
