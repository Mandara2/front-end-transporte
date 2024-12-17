import { TestBed } from '@angular/core/testing';

import { VehiculosConductoresService } from './vehiculos-conductores.service';

describe('VehiculosConductoresService', () => {
  let service: VehiculosConductoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculosConductoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
