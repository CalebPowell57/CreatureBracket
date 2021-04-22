import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMatchupSeed } from '../interfaces/seed-matchupDTO.interface';
import { SeedTournamentService } from './seed-tournament.service';

@Component({
  selector: 'app-seed-tournament',
  templateUrl: './seed-tournament.component.html',
  styleUrls: ['./seed-tournament.component.scss']
})
export class SeedTournamentComponent {
  SeededMatchups: IMatchupSeed[];
  constructor(private seedService: SeedTournamentService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.seedService.SeedCreatures().subscribe(seedings => {
      this.SeededMatchups = seedings;
    })
  }

  public onSeedMatchups() {
    this.seedService.SeedCreatures().subscribe(Round => {
      this.SeededMatchups = Round;
    });
  }

  public onStartBracket() {
    if (confirm("Are you sure you would like to start the bracket?")) {
      this.seedService.StartBracket().subscribe(response => {
        this.toastrService.success('Bracket successfully started!');
      });
    }
  }
}
