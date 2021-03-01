import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBracket } from '../interfaces/bracket.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalBracketService {
  constructor(private http: HttpClient) {
  }

  activeBracket() {
    let response = this.http.get<IBracket>(`${window.origin}/Bracket/Active`)

    return response;
  }
}
