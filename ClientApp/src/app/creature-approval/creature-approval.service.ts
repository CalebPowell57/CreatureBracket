import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ICreatureSubmission, eCreatureSubmissionStatus } from '../interfaces/creature-submission.interface';
import { IApproveSubmissionDTO } from '../interfaces/approve-submission-DTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CreatureApprovalService {
  constructor(private http: HttpClient) {
  }

  approve(creatureSubmissionId: Guid) {
    let dto: IApproveSubmissionDTO = { CreatureSubmissionId: creatureSubmissionId }

    return this.http.post('CreatureSubmission/Approve', dto);
  }

  getSubmissions(): Observable<ICreatureSubmission[]> {

    return this.http.get<ICreatureSubmission[]>('CreatureSubmission');
  }
}
