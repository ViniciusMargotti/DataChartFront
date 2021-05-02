import { TestBed } from '@angular/core/testing';

import {BairroService} from './bairro.service';

describe('BairroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BairroService = TestBed.get(BairroService);
    expect(service).toBeTruthy();
  });
});
