import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { IStandingsItemDTO } from '../interfaces/standings-item-DTO.interface';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  constructor(private http: HttpClient) {
  }

  getStandings(): Observable<IStandingsItemDTO[]> {
    return this.http.get<IStandingsItemDTO[]>('Bracket/Standings');
  }
}
