import { SubjectPageGuard } from "./subject-page.guard";
import { Router } from "@angular/router";

describe("SubjectPageGuard", () => {
  let guard: SubjectPageGuard;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj("Router", ["navigate"]);
    guard = new SubjectPageGuard(router);
  });

  it("should be createable", () => expect(guard).toBeTruthy());

  it("should return true if the user is a teacher", () => {
    localStorage.setItem("Jurnal_App_access", "true");
    expect(guard.canActivate()).toEqual(true);
  });

  it("should return true if the user is a teacher", () => {
    localStorage.setItem("Jurnal_App_access", "true");
    expect(guard.canActivate()).toEqual(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it("should return false if the user isn't a teacher", () => {
    localStorage.setItem("Jurnal_App_access", "false");
    expect(guard.canActivate()).toEqual(false);
  });

  it("should return false if the user isn't a teacher", () => {
    localStorage.setItem("Jurnal_App_access", "false");
    expect(guard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(["/forbidden"]);
  });

});
