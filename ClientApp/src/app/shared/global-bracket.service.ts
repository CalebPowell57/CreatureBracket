import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBracket } from '../interfaces/bracket.interface';
import { ICanEditMyBracketDTO } from '../interfaces/CanEditMyBracketDTO.interface';
import { IGlobalBracketDTO } from '../interfaces/GlobalBracketDTO.interface';
import { EImageType } from '../interfaces/image.interface';
import { IUserBracketDTO } from '../interfaces/UserBracketDTO.interface';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalBracketService {
  private ignoreMsalHttp: HttpClient;

  constructor(private http: HttpClient,
              private authService: MsalService,
              private handler: HttpBackend,
              private imageService: ImageService) {
    this.ignoreMsalHttp = new HttpClient(handler);
  }

  activeBracket() : Observable<IBracket> {
    return this.http.get<IBracket>('Bracket/Active');
  }

  activeBracketStatus(): Observable<any> {
    return this.ignoreMsalHttp.get<any>('api/Bracket/ActiveStatus');//is an anonymous endpoint so no auth needed for this
  }

  getBracketData(): Observable<IGlobalBracketDTO> {
    const account = this.authService.getAccount();

    let params = new HttpParams().set('userName', account.userName);

    return this.http.get<IGlobalBracketDTO>('Bracket/Global', { params: params }).pipe(map((bracket: IGlobalBracketDTO) => {
      let creatureIds: string[] = [];

      let firstRound = bracket.rounds[0];

      firstRound.matchups.forEach(matchup => {
        matchup.contestants.forEach(x => creatureIds.push(x.creatureId));
      });

      this.imageService.getImages(EImageType.Creatures, creatureIds).subscribe(images => {
        bracket.rounds.forEach(round => {
          round.matchups.forEach(matchup => {
            matchup.contestants.forEach(creature => {
              const found = images.filter(y => y.key.toLowerCase() === creature.creatureId.toLowerCase());

              creature.image = found[0].base64;
            });
          });
        });
      });

      return bracket;
    }));
  }

  canEditUserBracket(): Observable<ICanEditMyBracketDTO> {
    return this.http.get<ICanEditMyBracketDTO>('Bracket/CanEditMyBracket');
  }

  getMyBracket(): Observable<IUserBracketDTO> {
    const account = this.authService.getAccount();

    let params = new HttpParams().set('userName', account.userName);

    return this.http.get<IUserBracketDTO>('UserBracket/MyBracket', { params: params }).pipe(map((bracket: IUserBracketDTO) => {
      let creatureIds: string[] = [];

      let firstRound = bracket.rounds[0];

      firstRound.matchups.forEach(matchup => {
        creatureIds.push(matchup.creature1.creatureId);
        creatureIds.push(matchup.creature2.creatureId);
      });

      this.imageService.getImages(EImageType.Creatures, creatureIds).subscribe(images => {
        bracket.rounds.forEach(round => {
          round.matchups.forEach(matchup => {
            const found1 = images.filter(y => y.key.toLowerCase() === matchup.creature1.creatureId.toLowerCase());
            matchup.creature1.image = found1[0].base64;

            const found2 = images.filter(y => y.key.toLowerCase() === matchup.creature2.creatureId.toLowerCase());
            matchup.creature2.image = found2[0].base64;
          });
        });
      });

      return bracket;
    }));
  }

  saveMyBracket(bracket: IUserBracketDTO) {
    return this.http.post('UserBracket/Save', bracket);
  }
}
