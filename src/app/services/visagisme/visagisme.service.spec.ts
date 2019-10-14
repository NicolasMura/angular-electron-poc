import { TestBed } from '@angular/core/testing';

import { VisagismeService } from './visagisme.service';

describe('VisagismeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisagismeService = TestBed.get(VisagismeService);
    expect(service).toBeTruthy();
  });
});
