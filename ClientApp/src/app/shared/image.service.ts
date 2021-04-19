import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IImage } from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageCache: IImage[];

  constructor(private http: HttpClient) { }

  getAccountImages(userNames: string[]): Observable<IImage[]> {
    const images = this.imageCache.filter(x => {
      const found = userNames.filter(y => y.toLowerCase() === x.key.toLowerCase())

      if (found) {
        userNames = userNames.filter(x => x !== found[0]);
      } else {
        images.push(x);
      }
    });

    if (images.length < userNames.length) {
      const dto = { accountUserNames: userNames };

      const params = new HttpParams().set('dto', JSON.stringify(dto));

      return this.http.get<IImage[]>('Account/Images', { params: params }).pipe(map((mapImages: IImage[]) => {
        images.forEach(x => {
          mapImages.push(x);
          this.imageCache.push(x);
        });

        return mapImages;
      }));
    } else {
      return of(images);
    }
  }

  getCreatureImages(creatureIds: Guid[]): Observable<IImage[]> {
    const images = this.imageCache.filter(x => {
      const found = creatureIds.filter(y => y.toString() === x.key.toLowerCase())

      if (found) {
        creatureIds = creatureIds.filter(x => x !== found[0]);
      } else {
        images.push(x);
      }
    });

    if (images.length < creatureIds.length) {
      const dto = { creatureIds: creatureIds };

      const params = new HttpParams().set('dto', JSON.stringify(dto));

      return this.http.get<IImage[]>('Creature/Images', { params: params }).pipe(map((mapImages: IImage[]) => {
        images.forEach(x => {
          mapImages.push(x);
          this.imageCache.push(x);
        });

        return mapImages;
      }));
    } else {
      return of(images);
    }
  }
}    
