import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eCreatureSubmissionStatus, ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { CreatureApprovalService } from './creature-approval.service';

@Component({
  selector: 'app-creature-approval',
  templateUrl: './creature-approval.component.html'
})
export class CreatureApprovalComponent {
  pendingSubmissions: Observable<ICreatureSubmission[]>;
  approvedSubmissions: Observable<ICreatureSubmission[]>;

  constructor(
    private router: Router,
    private creatureApprovalService: CreatureApprovalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.pendingSubmissions = this.creatureApprovalService.getSubmissionsById(eCreatureSubmissionStatus.Pending);
    this.approvedSubmissions = this.creatureApprovalService.getSubmissionsById(eCreatureSubmissionStatus.Approved);
  }

  onApproveButtonClick(submission: ICreatureSubmission) {
    this.creatureApprovalService.approve(submission.id).subscribe(() => {
      this.toastrService.success(`${submission.name} has been approved for the tournament!`, 'Success');

      this.pendingSubmissions = this.pendingSubmissions.pipe(map(x => {
        return x.filter(y => y.id !== submission.id);
      }));

      this.approvedSubmissions = this.approvedSubmissions.pipe(map(x => {
        return x;
      }));
    });
  }
}
