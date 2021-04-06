import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreatureSubmissionDTO } from '../interfaces/creature-submission-DTO.interface';
import { ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { Observable } from 'rxjs';
import { IUserRoundDTO } from '../interfaces/UserRoundDTO.interface';
import { IUserMatchupDTO } from '../interfaces/UserMatchupDTO.interface';
import { ImatchupSeed } from '../interfaces/seed-matchupDTO.interface';


@Injectable({
  providedIn: 'root'
})
export class  SeedTournamentService {
  constructor(private http: HttpClient) {
  }

  GetCurrentStandings(): Observable<ImatchupSeed[]> {
    return this.http.get<ImatchupSeed[]>('Bracket/CurrentStandings');
  }
  SeedCreatures(): Observable<ImatchupSeed[]> {
    return this.http.get<ImatchupSeed[]>('Bracket/SeedCreatures');
  }
  StartBracket(){
    return this.http.get('Bracket/StartBracket');
  }
  
}
