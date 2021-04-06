import { Component } from '@angular/core';
import { ImatchupSeed } from '../interfaces/seed-matchupDTO.interface';
import { SeedTournamentService } from './seed-tournament.service';

@Component({
  selector: 'app-seed-tournament',
  templateUrl: './seed-tournament.component.html',
  styleUrls: ['./seed-tournament.component.scss']
})
export class SeedTournamentComponent {

  SeededMatchups: ImatchupSeed[];
  constructor(private seedService: SeedTournamentService) { }


  ngOnInit() {
    this.seedService.GetCurrentStandings().subscribe(CurrentStandings => {
      this.SeededMatchups = CurrentStandings;
    })
  }
  public onSeedMatchups() {
      this.seedService.SeedCreatures().subscribe(Round => {
        this.SeededMatchups = Round;
      })
  }
  public onStartBracket() {
    if (confirm("Are you sure you would like to start the bracket?")) {
      this.seedService.StartBracket().subscribe(response => {
        if (response) {

        }
      })
    }
  }

}
