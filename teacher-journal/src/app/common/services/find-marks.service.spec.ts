import { TestBed } from "@angular/core/testing";

import { FindMarksService } from "./find-marks.service";

describe("FindMarksService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FindMarksService = TestBed.get(FindMarksService);
    expect(service).toBeTruthy();
  });
});
