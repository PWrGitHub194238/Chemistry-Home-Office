import { TestBed } from "@angular/core/testing";
import { IsStudentGuard } from "./is-student.guard";

describe("IsStudentGuard", () => {
  let guard: IsStudentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsStudentGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
