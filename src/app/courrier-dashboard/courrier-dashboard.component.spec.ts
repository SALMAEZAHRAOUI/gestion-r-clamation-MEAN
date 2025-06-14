import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrierDashboardComponent } from './courrier-dashboard.component';

describe('CourrierDashboardComponent', () => {
  let component: CourrierDashboardComponent;
  let fixture: ComponentFixture<CourrierDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourrierDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourrierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
