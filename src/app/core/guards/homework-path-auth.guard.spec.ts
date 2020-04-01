import { TestBed } from "@angular/core/testing";
import { HomeworkPathAuthGuard } from "./homework-path-auth.guard";

describe("HomeworkPathAuthGuard", () => {
  let guard: HomeworkPathAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeworkPathAuthGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
