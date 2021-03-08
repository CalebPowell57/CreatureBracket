import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAuthenticationDTO } from '../interfaces/authenticationDTO.interface';
import { IRegisterDTO } from '../interfaces/register-DTO.interface';
import { AuthenticationService } from '../shared/authentication.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  input: IInput = {
    firstName: '',
    lastName: '',
    password1: '',
    password2: '',
    emailAddress: ''
  };

  constructor(
    private registerService: RegisterService,
    private toastrService: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let dto: IRegisterDTO = {
        FirstName: this.input.firstName,
        LastName: this.input.lastName,
        Password1: this.input.password1,
        Password2: this.input.password2,
        EmailAddress: this.input.emailAddress
      };

      this.registerService.register(dto).subscribe(() => {
        this.toastrService.success('You have been successfully registered!', 'Success');

        let credDTO: IAuthenticationDTO = {
          userName: dto.EmailAddress,
          password: dto.Password1
        };

        this.authenticationService.login(credDTO).subscribe(() => {
          this.router.navigate(['']);
        });
      });
    }
  }
}

interface IInput {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password1: string;
  password2: string;
}
