import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMatchupSeed } from '../interfaces/seed-matchupDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class  SeedTournamentService {
  constructor(private http: HttpClient) {
  }

  SeedCreatures(): Observable<IMatchupSeed[]> {
    return this.http.get<IMatchupSeed[]>('Bracket/SeedCreatures');
  }

  StartBracket() {
    return this.http.post('Bracket/StartBracket', {});
  }
}
