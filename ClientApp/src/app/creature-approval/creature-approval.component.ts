import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { CreatureApprovalService } from './creature-approval.service';

@Component({
  selector: 'app-creature-approval',
  templateUrl: './creature-approval.component.html'
})
export class CreatureApprovalComponent {
  submissions: Observable<ICreatureSubmission[]>;

  constructor(
    private router: Router,
    private creatureApprovalService: CreatureApprovalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.submissions = this.creatureApprovalService.getSubmissions();
  }

  onApproveButtonClick(submission: ICreatureSubmission) {
    this.creatureApprovalService.approve(submission.id).subscribe(() => {
      this.toastrService.success(`${submission.name} has been approved for the tournament!`, 'Success');
    });
  }
}
