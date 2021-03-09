import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyAccountService } from './verify-account.service';

@Component({
  templateUrl: './verify-account.component.html'
})
export class VerifyAccountComponent {
  constructor(
    private route: ActivatedRoute,
    private verifyAccountService: VerifyAccountService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.verifyAccountService.verify({ EmailAddress: params.emailAddress, VerifyGuid: params.verifyGuid }).subscribe(x => {
        
      });
    });
  }
}


