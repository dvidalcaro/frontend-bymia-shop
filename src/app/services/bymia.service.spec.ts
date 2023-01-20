import { TestBed } from '@angular/core/testing';

import { BymiaService } from './bymia.service';

describe('BymiaService', () => {
  let service: BymiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BymiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
