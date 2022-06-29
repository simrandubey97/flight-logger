import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInvestmentReadinessComponent } from './check-investment-readiness.component';

describe('CheckInvestmentReadinessComponent', () => {
  let component: CheckInvestmentReadinessComponent;
  let fixture: ComponentFixture<CheckInvestmentReadinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInvestmentReadinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInvestmentReadinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
