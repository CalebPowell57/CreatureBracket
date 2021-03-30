import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedingViewComponent } from './seeding-view.component';

describe('SeedingViewComponent', () => {
  let component: SeedingViewComponent;
  let fixture: ComponentFixture<SeedingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
