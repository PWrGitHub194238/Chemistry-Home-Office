import { TestBed } from "@angular/core/testing";
import { MatIconDictResolver } from "./mat-icon-dict.resolver";

describe("MatIconDictResolver", () => {
  let service: MatIconDictResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatIconDictResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
