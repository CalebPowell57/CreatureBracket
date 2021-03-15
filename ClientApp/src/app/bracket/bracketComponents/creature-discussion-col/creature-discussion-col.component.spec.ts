import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureDiscussionColComponent } from './creature-discussion-col.component';

describe('CreatureDiscussionColComponent', () => {
  let component: CreatureDiscussionColComponent;
  let fixture: ComponentFixture<CreatureDiscussionColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatureDiscussionColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatureDiscussionColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
