import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IStandingsItemDTO } from '../interfaces/standings-item-DTO.interface';
import { StandingsService } from './standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls:['./standings.component.scss']
})
export class StandingsComponent {
  //standings: observable<istandingsitemdto[]>;
  standings: IStandingsItemDTO[] = [];
  constructor(
    private router: Router,
    private standingsService: StandingsService) {
    //this.standings = standingsService.getStandings();
  }
  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      let standing: IStandingsItemDTO = {
        firstName: "JohnTest",
        lastName: "Dummy",
        points: i * 10000,
        rank: i
      };
      this.standings.push(standing);
    }
  }
}
