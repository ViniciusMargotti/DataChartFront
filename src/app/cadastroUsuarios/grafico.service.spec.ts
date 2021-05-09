import { TestBed } from '@angular/core/testing';

import { GraficoService } from './grafico.service';

describe('GraficoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraficoService = TestBed.get(GraficoService);
    expect(service).toBeTruthy();
  });
});
