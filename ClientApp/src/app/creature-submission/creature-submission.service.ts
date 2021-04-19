import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICreatureSubmissionDTO } from '../interfaces/creature-submission-DTO.interface';
import { ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { EImageType } from '../interfaces/image.interface';
import { ImageService } from '../shared/image.service';


@Injectable({
  providedIn: 'root'
})
export class CreatureSubmissionService {
  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  create(submission: ICreatureSubmissionDTO) {
    const response = this.http.post('CreatureSubmission', submission)

    return response;
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
    }));
  }
}
