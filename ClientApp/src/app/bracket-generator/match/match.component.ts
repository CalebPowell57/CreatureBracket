import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ICreatureSubmissionDTO } from '../../interfaces/creature-submission-DTO.interface'

@Component({
  selector: 'tt-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match: any;

  constructor() { }

  ngOnInit() {
  }

  public onClick(name: string) {
    
  }
}
