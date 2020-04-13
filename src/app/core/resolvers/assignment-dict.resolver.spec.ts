import { TestBed } from "@angular/core/testing";
import { AssignmentDictResolver } from "./assignment-dict.resolver";

describe("AssignmentDictResolver", () => {
  let service: AssignmentDictResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentDictResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
