import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bracket-manager',
  templateUrl: './bracket-manager.component.html'
})
export class BracketManagerComponent {

  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
  }
}
