import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyerReclmationParAssociationComponent } from './envoyer-reclmation-par-association.component';

describe('EnvoyerReclmationParAssociationComponent', () => {
  let component: EnvoyerReclmationParAssociationComponent;
  let fixture: ComponentFixture<EnvoyerReclmationParAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvoyerReclmationParAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvoyerReclmationParAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
