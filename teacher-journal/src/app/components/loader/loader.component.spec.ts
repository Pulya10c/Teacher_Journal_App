import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoaderComponent } from "./loader.component";
import { LoaderService } from "src/app/common/services/loader.service";

describe("LoaderComponent", () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let isVisible: boolean;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component instatce", () => {
    expect(component).toBeTruthy();
  });

  it("should display loader is visible", () => {
    const serviceLoder: LoaderService = fixture.debugElement.injector.get(LoaderService);
    component.isLoading$.subscribe(data => (isVisible = data));
    serviceLoder.show();
    fixture.detectChanges();
    expect(isVisible).toBeTruthy();
  });

  it("should display loader is not visible", () => {
    const serviceLoder: LoaderService = fixture.debugElement.injector.get(LoaderService);
    component.isLoading$.subscribe(data => (isVisible = data));
    serviceLoder.hide();
    fixture.detectChanges();
    expect(isVisible).toBeFalsy();
  });
});
