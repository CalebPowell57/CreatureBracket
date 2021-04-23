import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { IGlobalMatchupDTO } from '../../interfaces/GlobalMatchupDTO.interface';
import { IUserMatchupDTO } from '../../interfaces/UserMatchupDTO.interface';
import { SidebarService } from '../../shared/sidebar.service';

@Component({
  selector: 'app-creature-info',
  templateUrl: './creature-info.component.html',
  styleUrls: ['./creature-info.component.scss']
})
export class CreatureInfoComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private sidebarService: SidebarService) { }
  @Input() globalMatchupClicked: IGlobalMatchupDTO;
  @Input() userMatchupClicked: IUserMatchupDTO;

  creature1: ICreatureDTO;
  creature2: ICreatureDTO;

  ngOnInit() {
    if (this.userMatchupClicked) {
      this.setUserCreatures(this.userMatchupClicked);
    } else if (this.globalMatchupClicked) {
      this.setGlobalCreatures(this.globalMatchupClicked);
    }

    this.sidebarService.onUserMatchupClicked$.subscribe(x => {
      this.setUserCreatures(x);
    });

    this.sidebarService.onGlobalMatchupClicked$.subscribe(x => {
      this.setGlobalCreatures(x);
    });
  }

  setUserCreatures(matchup: IUserMatchupDTO) {
    if (!matchup.creature1 || !matchup.creature2) {
      return;
    }

    this.creature1 = {
      Name: matchup.creature1.name,
      Bio: matchup.creature1.bio,
      Image: matchup.creature1.image
    };

    this.creature2 = {
      Name: matchup.creature2.name,
      Bio: matchup.creature2.bio,
      Image: matchup.creature2.image
    };
  }

  setGlobalCreatures(matchup: IGlobalMatchupDTO) {
    if (!matchup.contestants || matchup.contestants.length !== 2) {
      return;
    }

    this.creature1 = {
      Name: matchup.contestants[0].name,
      Bio: matchup.contestants[0].bio,
      Image: matchup.contestants[0].image
    };

    this.creature2 = {
      Name: matchup.contestants[1].name,
      Bio: matchup.contestants[1].bio,
      Image: matchup.contestants[1].image
    };
  }
}
