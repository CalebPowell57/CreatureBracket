import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVote } from '../../interfaces/vote.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private http: HttpClient) {}

  post(vote: IVote): any {
    return this.http.post('Vote', vote);
  }
}
