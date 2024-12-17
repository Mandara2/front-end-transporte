import { TestBed } from '@angular/core/testing';

import { CentrosDistribucionService } from './centros-distribucion.service';

describe('CentrosDistribucionService', () => {
  let service: CentrosDistribucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentrosDistribucionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
