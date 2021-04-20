import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureInfoComponent } from './creature-info.component';

describe('CreatureInfoComponent', () => {
  let component: CreatureInfoComponent;
  let fixture: ComponentFixture<CreatureInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatureInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
