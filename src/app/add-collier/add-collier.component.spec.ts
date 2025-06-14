import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollierComponent } from './add-collier.component';

describe('AddCollierComponent', () => {
  let component: AddCollierComponent;
  let fixture: ComponentFixture<AddCollierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCollierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
