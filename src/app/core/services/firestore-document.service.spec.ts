import { TestBed } from "@angular/core/testing";

import { FirestoreDocumentService } from "../services/firestore-document.service";

describe("FirestoreDocumentService", () => {
  let service: FirestoreDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreDocumentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
