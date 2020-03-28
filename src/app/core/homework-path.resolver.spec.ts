import { TestBed } from "@angular/core/testing";
import { HomeworkPathResolver } from "./homework-path.resolver";

describe("HomeworkPathResolver", () => {
  let service: HomeworkPathResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeworkPathResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
