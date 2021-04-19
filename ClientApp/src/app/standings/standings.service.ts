import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EImageType } from '../interfaces/image.interface';
import { IStandingsItemDTO } from '../interfaces/standings-item-DTO.interface';
import { ImageService } from '../shared/image.service';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  getStandings(): Observable<IStandingsItemDTO[]> {
    return this.http.get<IStandingsItemDTO[]>('Bracket/Standings').pipe(map((standingItems: IStandingsItemDTO[]) => {
      let userNames: string[] = [];

      standingItems.forEach(x => userNames.push(x.userName));

      this.imageService.getImages(EImageType.Account, userNames).subscribe(images => {
        standingItems.forEach(x => {
          const found = images.filter(y => y.key.toLowerCase() === x.userName.toLowerCase());

          x.image = found[0].base64;
        })
      });

      return standingItems;
    }));
  }
}
