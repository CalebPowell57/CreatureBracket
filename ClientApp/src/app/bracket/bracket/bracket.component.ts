import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { ToastrService } from 'ngx-toastr';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { IGlobalBracketDTO } from '../../interfaces/GlobalBracketDTO.interface';
import { IUserBracketDTO } from '../../interfaces/UserBracketDTO.interface';
import { IUserMatchupDTO } from '../../interfaces/UserMatchupDTO.interface';
import { IUserRoundDTO } from '../../interfaces/UserRoundDTO.interface';
import { GlobalBracketService } from '../../shared/global-bracket.service';
import { NaviService } from '../../shared/navi.service';
import { SidebarService } from '../../shared/sidebar.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent {

  public bracket: IGlobalBracketDTO;
  public userBracket: IUserBracketDTO;
  @Output() userBracketSaveEvent: EventEmitter<any> = new EventEmitter();
  @Output() zoomButtonClick: string;
  @Output() zoomEvent: EventEmitter<any> = new EventEmitter();
  @Input() isGlobal: boolean;
  
  Winner: ICreatureDTO;
  Won = false;
  zoomInOut = {};
  canEdit = false;

  constructor(
    private bracketService: GlobalBracketService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private authService: MsalService,
    private naviService: NaviService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    if (this.isGlobal) {
      this.canEdit = true;
    } else {
      this.bracketService.canEditUserBracket().subscribe(x => {
        this.canEdit = x.canEdit;
      });
    }

    this.naviService.loadingChanged$.next(true);

    if (this.isGlobal) {
      this.bracketService.getBracketData().subscribe(data => {
        this.bracket = data;
        for (let round of data.rounds) {
          if (round.matchups.length === 1) {
            for (let contestant of round.matchups[0].contestants) {
              if (contestant.winner) {
                this.Winner = {
                  Bio: contestant.bio,
                  Name: contestant.name,
                  Image: contestant.image,
                };
                this.Won = true;
              }
            }
          }
        }

        this.naviService.loadingChanged$.next(false);
      });
    } else {
      this.bracketService.getMyBracket().subscribe(data => {
        this.naviService.loadingChanged$.next(false);
        this.userBracket = data;
      });
    }
  }

  public onMatchClick(matchup: any) {

    if (this.isGlobal) {
      this.sidebarService.onGlobalMatchClicked(matchup);
    }
    else {
      this.sidebarService.onUserMatchClicked(matchup);
    }
    

    if (matchup.vote != null && matchup.contestants != null) {
      this.sidebarService.sidebarColumnState("CreatureInformation", matchup.matchupId, matchup.vote.creatureId);
    }
    else if (!this.isGlobal && matchup.creature1 !== null && matchup.creature2 !== null) {
      if (matchup.creature1.winner) {
        this.sidebarService.sidebarColumnState("CreatureInformation", matchup.matchupId, matchup.creature1.creatureId);
      }
      else if (matchup.creature2.winner) {
        this.sidebarService.sidebarColumnState("CreatureInformation", matchup.matchupId, matchup.creature2.creatureId);
      }
      else {
        this.sidebarService.sidebarColumnState("CreatureInformation", matchup.matchupId, undefined);
      }
    }
    else if (matchup.contestants != null) {
      this.sidebarService.sidebarColumnState("CreatureInformation", matchup.matchupId, undefined);
    }
  }

  zoomClick(zoomButton: string) {
    this.zoomInOut = { Command: zoomButton };
  }


  userBracketSaveClick() {
    //this.userBracketSaveEvent.emit("Save Clicked");
    const account = this.authService.getAccount();

    let bracket: IUserBracketDTO = {
      rounds: [],
      userName: account.userName
    };

    this.userBracket.rounds.forEach(x => {
      let round: IUserRoundDTO = {
        matchups: [],
        rank: x.rank
      };

      x.matchups.forEach(y => {
        let matchup: IUserMatchupDTO = {
          creature1: null,
          creature2: null,
          matchupId: y.matchupId,
          matchupSeed: y.matchupSeed,
          roundRank: y.roundRank,
          unset: y.unset
        };

        if (y.creature1 !== null) {
          matchup.creature1 = {
            bio: y.creature1.bio,
            creatureId: y.creature1.creatureId,
            image: null,
            name: y.creature1.name,
            winner: y.creature1.winner
          };
        }

        if (y.creature2 !== null) {
          matchup.creature2 = {
            bio: y.creature2.bio,
            creatureId: y.creature2.creatureId,
            image: null,
            name: y.creature2.name,
            winner: y.creature2.winner
          };
        }

        round.matchups.push(matchup);
      });

      bracket.rounds.push(round);
    });

    this.bracketService.saveMyBracket(bracket).subscribe(() => {
      this.toastrService.success('Your bracket was successfully saved!', 'Success');
    });
  }

}
