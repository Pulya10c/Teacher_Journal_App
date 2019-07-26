import { TestBed, async, inject } from "@angular/core/testing";

import { SubjectPageGuard } from "./subject-page.guard";

describe("SubjectPageGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectPageGuard]
    });
  });

  it("should ...", inject([SubjectPageGuard], (guard: SubjectPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
