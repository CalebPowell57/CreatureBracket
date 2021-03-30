import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ICreatureSubmissionDTO } from '../interfaces/creature-submission-DTO.interface';
import { ICreatureDTO } from '../interfaces/CreatureDTO.interface';
import { ICreatureSubmission, eCreatureSubmissionStatus } from '../interfaces/creature-submission.interface';
import { IApproveSubmissionDTO } from '../interfaces/approve-submission-DTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CreatureSubmissionService {
  constructor(private http: HttpClient) {
  }

  create(submission: ICreatureSubmissionDTO) {
    let response = this.http.post('CreatureSubmission', submission)

    return response;
  }

  getSubmissionsById(): Observable<ICreatureSubmission[]> {
    let params = new HttpParams().set('status', status.toString());

    return this.http.get<ICreatureSubmission[]>('CreatureSubmission/ByStatus');
  }
}
