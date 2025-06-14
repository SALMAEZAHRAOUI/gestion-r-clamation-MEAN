import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourrierModalComponent } from './edit-courrier-modal.component';

describe('EditCourrierModalComponent', () => {
  let component: EditCourrierModalComponent;
  let fixture: ComponentFixture<EditCourrierModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourrierModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourrierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
