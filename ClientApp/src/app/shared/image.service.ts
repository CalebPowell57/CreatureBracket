import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EImageType, IImage } from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageCache: IImage[] = [];

  constructor(private http: HttpClient) { }

  getImages(type: EImageType, keys: string[]) : Observable<IImage[]> {
    let images = this.imageCache.filter(x => {
      const found = keys.filter(y => y.toLowerCase() === x.key.toLowerCase())

      if (found.length > 0) {
        keys = keys.filter(y => y.toLowerCase() !== found[0].toLowerCase());
        return true;
      } else {
        return false;
      }
    });

    if (keys.length > 0) {
      const dto = { Keys: keys, Type: type };

      return this.http.post<IImage[]>('Image', dto).pipe(map((mapImages: IImage[]) => {
        mapImages.forEach(x => {
          this.imageCache.push(x);
        });

        images.forEach(x => {
          mapImages.push(x);
        });

        return mapImages;
      }));
    } else {
      return of(images);
    }
  }
}    
