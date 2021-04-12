import { Component } from '@angular/core';
import { IStandingsItemDTO } from '../interfaces/standings-item-DTO.interface';
import { NaviService } from '../shared/navi.service';
import { StandingsService } from './standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls:['./standings.component.scss']
})
export class StandingsComponent {
  standings: IStandingsItemDTO[] = [];
  constructor(private standingsService: StandingsService, private naviService: NaviService) { }

  ngOnInit() {
    this.standingsService.getStandings().subscribe(x => {
      this.standings = x;
    })

    this.naviService.loadingChanged$.next(true);
  }
}
