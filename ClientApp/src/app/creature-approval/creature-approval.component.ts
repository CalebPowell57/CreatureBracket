import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { eCreatureSubmissionStatus, ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { CreatureApprovalService } from './creature-approval.service';

@Component({
  selector: 'app-creature-approval',
  templateUrl: './creature-approval.component.html',
  styleUrls: ['./creature-approval.component.scss'],
})
export class CreatureApprovalComponent {
  pendingSubmissions: ICreatureSubmission[];
  approvedSubmissions: ICreatureSubmission[];
  Pending_ApprovedSubmissions: ICreatureSubmission[];

  constructor(
    private router: Router,
    private creatureApprovalService: CreatureApprovalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.creatureApprovalService.getSubmissionsById(eCreatureSubmissionStatus.Pending).subscribe(x => {
      this.Pending_ApprovedSubmissions = x;
    });
    this.creatureApprovalService.getSubmissionsById(eCreatureSubmissionStatus.Approved).subscribe(x => {
      this.Pending_ApprovedSubmissions = this.Pending_ApprovedSubmissions.concat(x);
    });
  }

  onApproveButtonClick(submission: ICreatureSubmission) {
    this.creatureApprovalService.approve(submission.id).subscribe(() => {
      this.toastrService.success(`${submission.name} has been approved for the tournament!`, 'Success');

      this.pendingSubmissions = this.pendingSubmissions.filter(y => y.id !== submission.id);

      this.approvedSubmissions.push(submission);
    });
  }
}
