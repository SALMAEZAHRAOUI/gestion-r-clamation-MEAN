import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReclamationAssigneeComponent } from './liste-reclamation-assignee.component';

describe('ListeReclamationAssigneeComponent', () => {
  let component: ListeReclamationAssigneeComponent;
  let fixture: ComponentFixture<ListeReclamationAssigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeReclamationAssigneeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReclamationAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
