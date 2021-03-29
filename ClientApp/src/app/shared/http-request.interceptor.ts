import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    //let token = this.authenticationService.getAccessToken();

    //const headers = new HttpHeaders({
    //  'Content-Type': 'application/json',
    //  'Authorization': `Bearer ${token}`
    //});

    req = req.clone({
      url: `${window.origin}/api/${req.url}`/*,
      withCredentials: true,
      headers: headers*/
    });

    return next.handle(req);
  }
}
