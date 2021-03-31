import { Component, Input, Output, SimpleChange, EventEmitter, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IUserBracketDTO } from '../../interfaces/UserBracketDTO.interface';
import { IUserMatchupDTO } from '../../interfaces/UserMatchupDTO.interface';
import { IUserRoundDTO } from '../../interfaces/UserRoundDTO.interface';
import { GlobalBracketService } from '../../shared/global-bracket.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent {
  zoomInEnabled = false;
  zoomOutEnabled = true;
  zoom = 100;
  bracketStyle = {
    zoom: '100%'
  };

  public bracket: IUserBracketDTO;
  @Output() passMatch: Subject<any> = new Subject();
  @Output() selectedComponent: string;
  @Output() userBracketSaveEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectedAnimationClass: string;
  @Input() isGlobal: boolean;

  colActive = false;
  contentColumnCommand: string;
  isColInit: boolean;
  matchUpId: string;
  hasChatBeenDisplayed: boolean;
  creatureVotedForClassSelection: string;


  constructor(
    private bracketService: GlobalBracketService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private authService: MsalService) { }

  ngOnInit() {
    if (this.isGlobal) {
      this.bracketService.getBracketData().subscribe(data => {
        this.bracket = data;
        if (this.bracket.rounds[0].matchups.length >= 16) {
          this.zoomOut(40);
        }
        else {
          this.zoomOut(undefined);
        }
      });
    } else {
      this.bracketService.getMyBracket().subscribe(data => {
        this.bracket = data;
        if (this.bracket.rounds[0].matchups.length >= 16) {
          this.zoomOut(40);
        }
        else {
          this.zoomOut(undefined);
        }
      });
    }
    this.discussionCreatureColumnState("pageLoad", undefined, undefined);
  }

  public onMatchClick(matchup: any) {
    if (matchup.vote != null) {
      this.discussionCreatureColumnState("CreatureInformation", matchup.matchupId, matchup.vote.creatureId);

      this.passMatch.next(matchup);
    }
    else if (!this.isGlobal && matchup.creature1 !== null && matchup.creature2 !== null) {
      if (matchup.creature1.winner) {
        this.discussionCreatureColumnState("CreatureInformation", matchup.matchupId, matchup.creature1.creatureId);
      }
      else if (matchup.creature2.winner) {
        this.discussionCreatureColumnState("CreatureInformation", matchup.matchupId, matchup.creature2.creatureId);
      }
    }
    else {
      this.discussionCreatureColumnState("CreatureInformation", matchup.matchupId, undefined);
    }
    this.passMatch.next(matchup);

    this.cdr.detectChanges();
  }

  public onchatClick() {
    this.discussionCreatureColumnState("Discussion", undefined, undefined);
  }

  zoomIn() {

    this.zoomOutEnabled = true;

    this.zoom += 20;

    this.bracketStyle = {
      zoom: `${this.zoom}%`
    };

    if (this.zoom === 100) {
      this.zoomInEnabled = false;
    }
  }

  zoomOut(zoomInit: number) {
    this.zoomInEnabled = true;
    if (zoomInit === undefined) {
      this.zoom -= 20;
    }
    else {
      this.zoom -= zoomInit;
    }

    this.bracketStyle = {
      zoom: `${this.zoom}%`
    };

    if (this.zoom === 40) {
      this.zoomOutEnabled = false;
    }
  }

  userBracketSaveClick() {
    //this.userBracketSaveEvent.emit("Save Clicked");
    const account = this.authService.getAccount();

    let bracket: IUserBracketDTO = {
      rounds: [],
      accountId: account.accountIdentifier
    };

    this.bracket.rounds.forEach(x => {
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

  public discussionCreatureColumnState(contentRequested: string, requestedMatchId: string, CreatureVotedFor: string) {
    if (this.selectedComponent === contentRequested && contentRequested != "CreatureInformation" ||
      this.matchUpId === requestedMatchId && requestedMatchId != null && this.creatureVotedForClassSelection === CreatureVotedFor) {
      this.contentColumnCommand = "closeColumn";
      this.selectedAnimationClass = "closeColumn";
      this.colActive = false;
      this.isColInit = false;
      this.selectedComponent = "";
      this.matchUpId = "";
      this.creatureVotedForClassSelection = CreatureVotedFor;
    }
    else if (contentRequested === "pageLoad") {
      this.colActive = false;
      this.contentColumnCommand = contentRequested;
      this.selectedAnimationClass = undefined;
      this.isColInit = false;
      this.matchUpId = requestedMatchId;
    }
    else if (this.isColInit === false ||
      this.selectedAnimationClass === "init" && this.matchUpId != undefined && requestedMatchId != undefined) {
      this.colActive = true;
      this.contentColumnCommand = "init";
      this.selectedComponent = contentRequested;
      this.selectedAnimationClass = "init";
      this.isColInit = true;
      this.matchUpId = requestedMatchId;
      this.creatureVotedForClassSelection = CreatureVotedFor;
    }
    else {
      this.colActive = true;
      this.contentColumnCommand = "content";
      this.selectedComponent = contentRequested;
      this.selectedAnimationClass = contentRequested;
      this.matchUpId = requestedMatchId;
      this.creatureVotedForClassSelection = CreatureVotedFor;
    }
  }
}
