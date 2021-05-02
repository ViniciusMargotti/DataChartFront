import { TestBed } from '@angular/core/testing';

import {BairroService} from './bairro.service';
import {CidadeService} from './cidade.service';
import {EstadoService} from './estado.service';

describe('EstadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoService = TestBed.get(EstadoService);
    expect(service).toBeTruthy();
  });
});
