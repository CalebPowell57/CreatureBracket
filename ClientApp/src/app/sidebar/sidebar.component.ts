import { Component, Input, Output } from '@angular/core';
import { IGlobalMatchupDTO } from '../interfaces/GlobalMatchupDTO.interface';
import { ISidebarParams } from '../interfaces/sidebar.interface';
import { IUserMatchupDTO } from '../interfaces/UserMatchupDTO.interface';
import { SidebarService } from '../shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {
  constructor(private sidebarService: SidebarService) {
    this.subscribeToEvents();
  }

  @Input() sidebarParams: ISidebarParams;
  @Output() globalMatchupClicked: IGlobalMatchupDTO;
  @Output() userMatchupClicked: IUserMatchupDTO;

  public closeSideBar() {
    this.sidebarService.sidebarColumnState("closeColumn", undefined, undefined);
  }

  private subscribeToEvents(): void {
    this.sidebarService.onGlobalMatchupClicked$.subscribe((globalMatchupClicked: IGlobalMatchupDTO) => {
      this.globalMatchupClicked = globalMatchupClicked
    });
    this.sidebarService.onUserMatchupClicked$.subscribe((userMatchupClicked: IUserMatchupDTO) => {
      this.userMatchupClicked = userMatchupClicked
    });
  }
}
