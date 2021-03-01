import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      //add register logic
    }
  }
}
