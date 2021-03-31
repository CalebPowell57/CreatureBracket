import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {
  constructor(private toastrService: ToastrService) {}

  handleError(error) {
    if (error.error && error.error.startsWith("CreatureBracket.Exceptions.ExpectedException")) {
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
