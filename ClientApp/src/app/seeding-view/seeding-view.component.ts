import { Component, OnInit } from '@angular/core';
import { ImatchupSeed } from '../interfaces/seed-matchupDTO.interface';
import { IUserMatchupDTO } from '../interfaces/UserMatchupDTO.interface';
import { IUserRoundDTO } from '../interfaces/UserRoundDTO.interface';
import { SeedingService } from './seeding-view.service';

@Component({
  selector: 'app-seeding-view',
  templateUrl: './seeding-view.component.html',
  styleUrls: ['./seeding-view.component.scss']
})
export class SeedingViewComponent {

  SeededMatchups: ImatchupSeed[];
  constructor(private seedingService: SeedingService) { }

  public onSeedMatchups() {
      this.seedingService.SeedCreatures().subscribe(Round => {
        this.SeededMatchups = Round;
      })
  }

  public onStartBracket() {
    if (confirm("Are you sure you would like to start the bracket?")) {
      this.seedingService.StartBracket().subscribe(response => {
        if (response) {

        }
      })
    }
  }

}
