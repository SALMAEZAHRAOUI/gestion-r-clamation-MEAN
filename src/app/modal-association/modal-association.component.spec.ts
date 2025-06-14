import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssociationComponent } from './modal-association.component';

describe('ModalAssociationComponent', () => {
  let component: ModalAssociationComponent;
  let fixture: ComponentFixture<ModalAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
