import { TestBed } from "@angular/core/testing";

import { ExitSubjectPageGuard } from "./exit-subject-page.guard";
import { IComponentCanDeactivate } from "../entities/component-can-deactivate";
import { Observable, Subject } from "rxjs";
import { Component } from "@angular/core";

@Component({})
class MockComponent implements IComponentCanDeactivate {
  public returnValue: boolean | Observable<boolean>;

  public canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}

describe("ExitSubjectPageGuard", () => {
  let mockComponent: MockComponent;
  let guard: ExitSubjectPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExitSubjectPageGuard, MockComponent]
    });
    guard = TestBed.get(ExitSubjectPageGuard);
    mockComponent = TestBed.get(MockComponent);
  });

  it("expect service to instantiate", () => {
    expect(guard).toBeTruthy();
  });

  it("can route if unguarded", () => {
    mockComponent.returnValue = true;
    expect(guard.canDeactivate(mockComponent)).toBeTruthy();
  });

  it("will route if guarded and user accepted the dialog", () => {
    const subject$: Subject<boolean> = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();
    const canDeactivate$: boolean | Observable<boolean> = <Observable<boolean>>guard.canDeactivate(mockComponent);
    canDeactivate$.subscribe(deactivate => {
      expect(deactivate).toBeTruthy();
    });
    subject$.next(true);
  });

  it("will not route if guarded and user rejected the dialog", () => {
    const subject$: Subject<boolean> = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();
    const canDeactivate$: boolean | Observable<boolean> = <Observable<boolean>>guard.canDeactivate(mockComponent);
    canDeactivate$.subscribe(deactivate => {
      expect(deactivate).toBeFalsy();
    });
    subject$.next(false);
  });
});
