import { TestBed } from '@angular/core/testing';

import { CameraSwitchService } from './camera-switch.service';

describe('CameraSwitchService', () => {
  let service: CameraSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
