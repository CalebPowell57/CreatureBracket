import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { IBracket } from '../interfaces/bracket.interface';
import { IUserBracketDTO } from '../interfaces/UserBracketDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalBracketService {
  constructor(private http: HttpClient,
              private authService: MsalService) {
  }

  activeBracket() : Observable<IBracket> {
    return this.http.get<IBracket>('Bracket/Active');
  }

  getBracketData(): Observable<IUserBracketDTO> {
    const account = this.authService.getAccount();

    let params = new HttpParams().set('accountId', account.accountIdentifier);

    return this.http.get<IUserBracketDTO>('Bracket/Global', { params: params });
  }

  getMyBracket(): Observable<IUserBracketDTO> {
    const account = this.authService.getAccount();

    let params = new HttpParams().set('accountId', account.accountIdentifier);

    return this.http.get<IUserBracketDTO>('UserBracket/MyBracket', { params: params });
  }

  saveMyBracket(bracket: IUserBracketDTO) {
    return this.http.post('UserBracket/Save', bracket);
  }
}
