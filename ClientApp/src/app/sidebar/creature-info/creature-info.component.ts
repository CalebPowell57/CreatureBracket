import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICreatureDTO } from '../../interfaces/CreatureDTO.interface';
import { IGlobalMatchupDTO } from '../../interfaces/GlobalMatchupDTO.interface';
import { IUserMatchupDTO } from '../../interfaces/UserMatchupDTO.interface';

@Component({
  selector: 'app-creature-info',
  templateUrl: './creature-info.component.html',
  styleUrls: ['./creature-info.component.scss']
})
export class CreatureInfoComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }
  @Input() globalMatchupClicked: IGlobalMatchupDTO;
  @Input() userMatchupClicked: IUserMatchupDTO;

  creature1: ICreatureDTO;
  creature2: ICreatureDTO;
  ngOnInit() {
    if (this.globalMatchupClicked === undefined) {
      this.creature1 = {
        Name: this.userMatchupClicked.creature1.name,
        Bio: this.userMatchupClicked.creature1.bio,
        Image: this.userMatchupClicked.creature1.image
      };

      this.creature2 = {
        Name: this.userMatchupClicked.creature2.name,
        Bio: this.userMatchupClicked.creature2.bio,
        Image: this.userMatchupClicked.creature2.image
      };
    }
    else {
      this.creature1 = {
        Name: this.globalMatchupClicked.contestants[0].name,
        Bio: this.globalMatchupClicked.contestants[0].bio,
        Image: this.globalMatchupClicked.contestants[0].image
      }
      this.creature2 = {
        Name: this.globalMatchupClicked.contestants[1].name,
        Bio: this.globalMatchupClicked.contestants[1].bio,
        Image: this.globalMatchupClicked.contestants[1].image
      }
    }
  }

}
