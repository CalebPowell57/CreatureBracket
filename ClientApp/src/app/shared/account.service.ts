import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

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
}    
