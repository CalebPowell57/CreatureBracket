import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  input: IInput = { userName: '', password: '' };

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  onSubmit(form: NgForm) {
    this.authenticationService.login({ userName: this.input.userName, password: this.input.password })
      .subscribe(
        authenticationDTO => {
          let b = authenticationDTO;

          this.router.navigate(['']);
        }
      );
  }
}

interface IInput {
  userName: string;
  password: string;
}
