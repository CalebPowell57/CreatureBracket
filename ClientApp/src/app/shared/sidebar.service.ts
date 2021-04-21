import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IGlobalMatchupDTO } from '../interfaces/GlobalMatchupDTO.interface';
import { ISidebarParams } from '../interfaces/sidebar.interface';
import { IUserMatchupDTO } from '../interfaces/UserMatchupDTO.interface';


@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  onGlobalMatchupClicked$ = new Subject<IGlobalMatchupDTO>();
  onUserMatchupClicked$ = new Subject<IUserMatchupDTO>();
  onSidebarParamsChanged$ = new Subject <ISidebarParams>()
  sidebarParams: ISidebarParams;

  public sidebarColumnState(contentRequested: string, requestedMatchId: string, CreatureVotedFor: string) {
    if (this.sidebarParams === undefined && contentRequested === "pageLoad") {
      this.sidebarParams = {
        contentColumnCommand: contentRequested,
        selectedAnimationClass: undefined,
        colActive: false,
        isColInit: false,
        selectedComponent: undefined,
        matchupId: undefined,
        creatureVotedForClassSelection: undefined
      }
    }
    else if (contentRequested === "closeColumn" || this.sidebarParams.selectedComponent === contentRequested && contentRequested != "CreatureInformation" ||
      this.sidebarParams.matchupId === requestedMatchId && requestedMatchId != null && this.sidebarParams.creatureVotedForClassSelection === CreatureVotedFor) {
      this.sidebarParams = {
        contentColumnCommand: "closeColumn",
        selectedAnimationClass: "closeColumn",
        colActive: false,
        isColInit: false,
        selectedComponent: undefined,
        matchupId: undefined,
        creatureVotedForClassSelection: CreatureVotedFor
      }
    }
    else if (this.sidebarParams.isColInit === undefined || this.sidebarParams.isColInit === false || this.sidebarParams.selectedAnimationClass === "init" && this.sidebarParams.matchupId != undefined && requestedMatchId != undefined) {
      this.sidebarParams = {
        contentColumnCommand: "init",
        selectedAnimationClass: "init",
        colActive: true,
        isColInit: true,
        selectedComponent: contentRequested,
        matchupId: requestedMatchId,
        creatureVotedForClassSelection: CreatureVotedFor
      }
    }
    else {
      this.sidebarParams = {
        contentColumnCommand: "content",
        selectedAnimationClass: contentRequested,
        colActive: true,
        isColInit: true,
        selectedComponent: contentRequested,
        matchupId: requestedMatchId,
        creatureVotedForClassSelection: CreatureVotedFor
      }
    }
    return this.onSidebarParamsChanged$.next(this.sidebarParams);
  }

  public onGlobalMatchClicked(globalMatchup: IGlobalMatchupDTO): void {
    this.onGlobalMatchupClicked$.next(globalMatchup);
  }
  public onUserMatchClicked(userMatchup: IUserMatchupDTO): void {
    this.onUserMatchupClicked$.next(userMatchup);
  }
  public onChangeView() {
    if (this.sidebarParams.selectedComponent === "CreatureInformation" && this.sidebarParams.colActive === true) {
      this.sidebarParams = {
        contentColumnCommand: "closeColumn",
        selectedAnimationClass: "closeColumn",
        colActive: false,
        isColInit: false,
        selectedComponent: undefined,
        matchupId: undefined,
        creatureVotedForClassSelection: undefined
      }
      this.onSidebarParamsChanged$.next(this.sidebarParams);
    }
  }

}
