import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IStandingsItemDTO } from '../interfaces/standings-item-DTO.interface';
import { StandingsService } from './standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html'
})
export class StandingsComponent {
  standings: Observable<IStandingsItemDTO[]>;

  constructor(
    private router: Router,
    private standingsService: StandingsService) {
    this.standings = standingsService.getStandings();
  }
}
