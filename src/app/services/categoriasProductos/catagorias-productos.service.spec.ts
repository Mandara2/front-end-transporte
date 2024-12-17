import { TestBed } from '@angular/core/testing';

import { CatagoriasProductosService } from './catagorias-productos.service';

describe('CatagoriasProductosService', () => {
  let service: CatagoriasProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatagoriasProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
