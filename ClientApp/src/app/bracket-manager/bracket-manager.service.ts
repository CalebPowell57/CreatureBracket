import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBracket } from '../interfaces/bracket.interface';

@Injectable({
  providedIn: 'root'
})
export class BracketManagerService {
  constructor(private http: HttpClient) {}

  getItems(): any {
    return this.http.get<IBracket[]>('Bracket');
  }

  postItem(item: IBracket): any {
    return this.http.post('Bracket', item);
  }

  deleteItem(id: string): any {
    return this.http.delete(`Bracket/${id}`);
  }
}
