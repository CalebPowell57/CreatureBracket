import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedTournamentComponent } from './seed-tournament.component';

describe('SeedTournamentComponent', () => {
  let component: SeedTournamentComponent;
  let fixture: ComponentFixture<SeedTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeedTournamentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
