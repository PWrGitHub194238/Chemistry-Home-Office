import { TestBed } from "@angular/core/testing";
import { IsHomeworkPathActiveGuard } from "./is-homework-path-active.guard";

describe("IsHomeworkPathActiveGuard", () => {
  let guard: IsHomeworkPathActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsHomeworkPathActiveGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
