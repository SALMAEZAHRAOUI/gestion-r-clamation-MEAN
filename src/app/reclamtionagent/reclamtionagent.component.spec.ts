import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamtionagentComponent } from './reclamtionagent.component';

describe('ReclamtionagentComponent', () => {
  let component: ReclamtionagentComponent;
  let fixture: ComponentFixture<ReclamtionagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamtionagentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamtionagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
