import { TestBed } from '@angular/core/testing';

import { CatoriasService } from './catorias.service';

describe('CatoriasService', () => {
  let service: CatoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
