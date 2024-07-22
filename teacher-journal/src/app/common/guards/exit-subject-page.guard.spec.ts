import { TestBed, inject } from "@angular/core/testing";

import { ExitSubjectPageGuard } from "./exit-subject-page.guard";

describe("ExitSubjectPageGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExitSubjectPageGuard]
    });
  });

  it("should ...", inject(
    [ExitSubjectPageGuard],
    (guard: ExitSubjectPageGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
