import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bracket',
  templateUrl: './user-bracket.component.html'
})
export class UserBracketComponent {
  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
  }
}
