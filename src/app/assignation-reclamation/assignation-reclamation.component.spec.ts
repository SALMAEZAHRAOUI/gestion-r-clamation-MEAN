import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationReclamationComponent } from './assignation-reclamation.component';

describe('AssignationReclamationComponent', () => {
  let component: AssignationReclamationComponent;
  let fixture: ComponentFixture<AssignationReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignationReclamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignationReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
