import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { EType, IUser } from '../interfaces/user.interface';
import { Guid } from 'guid-typescript';
import { IAuthenticationDTO } from '../interfaces/authenticationDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(credentials: IAuthenticationDTO) {
    //this.currentUserSubject.next({
    //  FirstName: 'Caleb',
    //  LastName: 'Powell',
    //  Username: credentials.loginId,
    //  Password: credentials.password,
    //  Id: Guid.create().toString(),
    //  Type: eType.Super
    //});

    let response = this.http.post<any>(`${window.origin}/Security/Authenticate`, credentials)
      .pipe(map(user => {
        this.currentUserSubject.next(user);
        return user;
      }));

    return response;
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  getAccessToken(): string {
    const name = 'access_token';

    const nameLenPlus = (name.length + 1);
    const cookie = document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;

    return cookie;
  }
}
