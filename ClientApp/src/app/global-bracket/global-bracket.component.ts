import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-bracket',
  templateUrl: './global-bracket.component.html'
})
export class GlobalBracketComponent {
  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
  }
}
