import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NaviService } from './navi.service';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {
  constructor(private toastrService: ToastrService, private naviService: NaviService, private injector: Injector) { }

  handleError(error) {
    this.naviService.loadingChanged$.next(false);

    if (error.errorCode === 'user_login_error' || error.errorCode === 'token_renewal_error' || error.errorCode === 'login_required') {//duplicate check in require-authentication.guard.ts
      const router = this.injector.get(Router);

      router.navigate(['not-signed-in']);
    }
    else if (error.error && (error.error instanceof String || typeof error.error == 'string') && error.error.startsWith("CreatureBracket.Exceptions.ExpectedException")) {
      let json = `{${error.error.split('{')[1].split('}')[0]}}`;

      let errorInformation = JSON.parse(json);

      if (errorInformation.SeverityLevel === 0) {
        this.toastrService.error(errorInformation.Message, errorInformation.Title);//there is a bug that doesn't show the toast unless you move the cursor for some reason on the creature submission view. I believe this to be do to a styling conflict with bootstrap as found here https://github.com/scttcper/ngx-toastr/issues/605
      } else {
        window.alert(errorInformation.Message);
      }
    } else {
      console.error(error);

      window.alert(error);
    }
  }
}
