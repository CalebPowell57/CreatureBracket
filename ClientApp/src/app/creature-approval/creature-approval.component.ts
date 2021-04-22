import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { eCreatureSubmissionStatus, ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { NaviService } from '../shared/navi.service';
import { CreatureApprovalService } from './creature-approval.service';

@Component({
  selector: 'app-creature-approval',
  templateUrl: './creature-approval.component.html',
  styleUrls: ['./creature-approval.component.scss'],
})
export class CreatureApprovalComponent {
  pendingSubmissions: ICreatureSubmission[] = [];
  approvedSubmissions: ICreatureSubmission[] = [];

  constructor(
    private creatureApprovalService: CreatureApprovalService,
    private toastrService: ToastrService,
    private naviService: NaviService
  ) { }

  ngOnInit() {
    this.naviService.loadingChanged$.next(true);

    this.creatureApprovalService.getSubmissions().subscribe(x => {
      for (let creature of x) {
        if (creature.status === 0) {
          this.pendingSubmissions.push(creature);
        }
        else {
          this.approvedSubmissions.push(creature);
        }
      }

      this.naviService.loadingChanged$.next(false);
    });
  }

  onApproveButtonClick(submission: ICreatureSubmission) {
    this.creatureApprovalService.approve(submission.id).subscribe(() => {
      this.toastrService.success(`${submission.name} has been approved for the tournament!`, 'Success');

      this.pendingSubmissions = this.pendingSubmissions.filter(y => y.id !== submission.id);

      submission.status = eCreatureSubmissionStatus.Approved;

      this.approvedSubmissions.push(submission);
    });
  }

  onRemoveApprovalButtonClick(submission: ICreatureSubmission) {
    this.creatureApprovalService.removeApproval(submission.id).subscribe(() => {
      this.toastrService.success(`${submission.name} has been removed from the list of creatures approved for the tournament!`, 'Success');

      this.approvedSubmissions = this.approvedSubmissions.filter(y => y.id !== submission.id);

      submission.status = eCreatureSubmissionStatus.Pending;

      this.pendingSubmissions.push(submission);
    });
  }
}
