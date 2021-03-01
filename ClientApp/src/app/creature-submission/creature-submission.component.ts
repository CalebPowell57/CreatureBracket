import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creature-submission',
  templateUrl: './creature-submission.component.html'
})
export class CreatureSubmissionComponent {
  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
  }
}
