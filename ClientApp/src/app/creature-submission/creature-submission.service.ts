import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreatureSubmissionDTO } from '../interfaces/creature-submission-DTO.interface';
import {  ICreatureSubmission } from '../interfaces/creature-submission.interface';
import {Observable} from 'rxjs';


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

    return this.http.get<ICreatureSubmission[]>('CreatureSubmission/ByStatus');
  }
}
