import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCollierComponent } from './assign-collier.component';

describe('AssignCollierComponent', () => {
  let component: AssignCollierComponent;
  let fixture: ComponentFixture<AssignCollierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCollierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignCollierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
