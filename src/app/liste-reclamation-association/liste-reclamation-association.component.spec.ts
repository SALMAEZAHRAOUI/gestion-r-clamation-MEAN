import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReclamationAssociationComponent } from './liste-reclamation-association.component';

describe('ListeReclamationAssociationComponent', () => {
  let component: ListeReclamationAssociationComponent;
  let fixture: ComponentFixture<ListeReclamationAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeReclamationAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReclamationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
