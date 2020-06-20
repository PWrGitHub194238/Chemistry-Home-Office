import { TestBed } from "@angular/core/testing";
import { SubjecDictResolver } from "./subject-dict.resolver";

describe("SubjecDictResolver", () => {
  let service: SubjecDictResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjecDictResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
