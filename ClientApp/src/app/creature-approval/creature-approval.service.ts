import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ICreatureSubmission } from '../interfaces/creature-submission.interface';

@Injectable({
  providedIn: 'root'
})
export class CreatureApprovalService {
  constructor(private http: HttpClient) {
  }

  approve(creatureSubmissionId: Guid) {
    return this.http.post('CreatureSubmission/Approve', creatureSubmissionId.toString());
  }

  getSubmissions(): Observable<ICreatureSubmission[]> {
    return this.http.get<ICreatureSubmission[]>('CreatureSubmission');
  }
}
