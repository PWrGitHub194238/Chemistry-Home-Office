import { TestBed } from '@angular/core/testing';

import { FirefunctionService } from './firefunction.service';

describe('FirefunctionService', () => {
  let service: FirefunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirefunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
