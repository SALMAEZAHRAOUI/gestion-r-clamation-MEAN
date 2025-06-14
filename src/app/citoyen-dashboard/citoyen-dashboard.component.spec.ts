import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenDashboardComponent } from './citoyen-dashboard.component';

describe('CitoyenDashboardComponent', () => {
  let component: CitoyenDashboardComponent;
  let fixture: ComponentFixture<CitoyenDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitoyenDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitoyenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
