import { Component } from '@angular/core';
import { IStandingsItemDTO } from '../interfaces/standings-item-DTO.interface';
import { StandingsService } from './standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls:['./standings.component.scss']
})
export class StandingsComponent {
  standings: IStandingsItemDTO[] = [];
  constructor(private standingsService: StandingsService) {}

  ngOnInit() {
    this.standingsService.getStandings().subscribe(x => {
      this.standings = x;
    })
  }
}
