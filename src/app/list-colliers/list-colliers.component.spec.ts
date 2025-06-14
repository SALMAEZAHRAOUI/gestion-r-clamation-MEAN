import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColliersComponent } from './list-colliers.component';

describe('ListColliersComponent', () => {
  let component: ListColliersComponent;
  let fixture: ComponentFixture<ListColliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListColliersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListColliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
