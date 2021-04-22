import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApproveSubmissionDTO } from '../interfaces/approve-submission-DTO.interface';
import { ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { EImageType } from '../interfaces/image.interface';
import { ImageService } from '../shared/image.service';

@Injectable({
  providedIn: 'root'
})
export class CreatureApprovalService {
  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  approve(creatureSubmissionId: Guid) {
    let dto: IApproveSubmissionDTO = { CreatureSubmissionId: creatureSubmissionId }

    return this.http.post('CreatureSubmission/Approve', dto);
  }

  removeApproval(creatureSubmissionId: Guid) {
    let dto: IApproveSubmissionDTO = { CreatureSubmissionId: creatureSubmissionId }

    return this.http.post('CreatureSubmission/RemoveApproval', dto);
  }

  getSubmissions(): Observable<ICreatureSubmission[]> {

    return this.http.get<ICreatureSubmission[]>('CreatureSubmission').pipe(map((submissions: ICreatureSubmission[]) => {
      let submissionIds: string[] = [];

      submissions.forEach(x => submissionIds.push(x.id.toString()));

      this.imageService.getImages(EImageType.CreatureSubmissions, submissionIds).subscribe(images => {
        submissions.forEach(x => {
          const found = images.filter(y => y.key.toLowerCase() === x.id.toString().toLowerCase());

          x.image = found[0].base64;
        })
      });

      return submissions;
    }));;
  }
}
