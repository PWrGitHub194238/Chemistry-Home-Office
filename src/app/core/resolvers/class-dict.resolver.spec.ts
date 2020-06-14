import { TestBed } from "@angular/core/testing";
import { ClassDictResolver } from "./class-dict.resolver";

describe("ClassDictResolver", () => {
  let service: ClassDictResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassDictResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
