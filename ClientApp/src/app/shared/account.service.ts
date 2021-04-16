import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { IAccountSettingGroupDTO } from '../interfaces/AccountSettingGroupDTO.interface';
import { IAccountSettingDTO } from '../interfaces/AccountSettingDTO.interface';
import { ISaveAccountSettingDTO } from '../interfaces/SaveAccountSettingDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private authService: MsalService) { }

  getInformation(): Observable<any> {
    const account = this.authService.getAccount();

    const params = new HttpParams().set('userName', account.userName);

    return this.http.get<any>('Account/Information', { params: params });
  }

  getSettings(): Observable<IAccountSettingGroupDTO[]> {
    const account = this.authService.getAccount();

    const params = new HttpParams().set('userName', account.userName);

    return this.http.get<IAccountSettingGroupDTO[]>('Account/Settings', { params: params });
  }

  saveSetting(setting: IAccountSettingDTO): any {
    const account = this.authService.getAccount();

    const saveDTO: ISaveAccountSettingDTO = {
      key: setting.key,
      userName: account.userName,
      value: setting.value
    };

    return this.http.post('Account/Setting', saveDTO);
  }
}    
