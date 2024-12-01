import { TestBed } from '@angular/core/testing';

import { PersonasNaturalesService } from './personas-naturales.service';

describe('PersonasNaturalesService', () => {
  let service: PersonasNaturalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasNaturalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
