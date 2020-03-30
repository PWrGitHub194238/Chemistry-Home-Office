import { TestBed } from "@angular/core/testing";

import { UserDetailsResolver } from "./user-details.resolver";

describe("UserDetailsResolver", () => {
  let service: UserDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsResolver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
