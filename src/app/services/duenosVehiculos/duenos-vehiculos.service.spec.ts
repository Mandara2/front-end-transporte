import { TestBed } from '@angular/core/testing';

import { DuenosVehiculosService } from './duenos-vehiculos.service';

describe('DuenosVehiculosService', () => {
  let service: DuenosVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuenosVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
