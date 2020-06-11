import { TestBed } from '@angular/core/testing';

import { FirestorageDocumentService } from './firestorage-document.service';

describe('FirestorageDocumentService', () => {
  let service: FirestorageDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorageDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
