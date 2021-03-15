import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMatchDiscussionInfoComponent } from './selected-match-discussion-info.component';

describe('SelectedMatchDiscussionInfoComponent', () => {
  let component: SelectedMatchDiscussionInfoComponent;
  let fixture: ComponentFixture<SelectedMatchDiscussionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedMatchDiscussionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMatchDiscussionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
