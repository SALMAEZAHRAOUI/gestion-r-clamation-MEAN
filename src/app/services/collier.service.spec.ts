import { TestBed } from '@angular/core/testing';

import { CollierService } from './CourrierService ';

describe('CollierService', () => {
  let service: CollierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
