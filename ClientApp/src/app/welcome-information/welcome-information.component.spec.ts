import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeInformationComponent } from './welcome-information.component';

describe('WelcomeInformationComponent', () => {
  let component: WelcomeInformationComponent;
  let fixture: ComponentFixture<WelcomeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
