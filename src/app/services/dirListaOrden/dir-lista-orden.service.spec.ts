import { TestBed } from '@angular/core/testing';

import { DirListaOrdenService } from './dir-lista-orden.service';

describe('DirListaOrdenService', () => {
  let service: DirListaOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirListaOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
