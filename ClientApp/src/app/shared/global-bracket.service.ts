import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { IBracket } from '../interfaces/bracket.interface';
import { ICanEditMyBracketDTO } from '../interfaces/CanEditMyBracketDTO.interface';
import { IGlobalBracketDTO } from '../interfaces/GlobalBracketDTO.interface';
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

  getBracketData(): Observable<IGlobalBracketDTO> {
    const account = this.authService.getAccount();

    let params = new HttpParams().set('userName', account.userName);

    return this.http.get<IGlobalBracketDTO>('Bracket/Global', { params: params });
  }

  canEditUserBracket(): Observable<ICanEditMyBracketDTO> {
    return this.http.get<ICanEditMyBracketDTO>('Bracket/CanEditMyBracket');
  }

  getMyBracket(): Observable<IUserBracketDTO> {
    const account = this.authService.getAccount();

    let params = new HttpParams().set('userName', account.userName);

    return this.http.get<IUserBracketDTO>('UserBracket/MyBracket', { params: params });
  }

  saveMyBracket(bracket: IUserBracketDTO) {
    return this.http.post('UserBracket/Save', bracket);
  }
}
