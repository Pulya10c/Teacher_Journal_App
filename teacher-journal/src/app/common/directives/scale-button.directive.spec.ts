import { ScaleButtonDirective } from "./scale-button.directive";
import { Component, DebugElement } from "@angular/core";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <button scaleButton></button>
  `
})
class TestComponent {}

describe("ScaleButtonDirective", () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let mouseenter: MouseEvent;
  let mouseleave: MouseEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ScaleButtonDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.componentInstance;
    mouseenter = new MouseEvent("mouseenter");
    mouseleave = new MouseEvent("mouseleave");
  });

  it("should create an instance", () => {
    expect(component).toBeTruthy();
  });

  it("should log mouseenter element", () => {
    const div: DebugElement = fixture.debugElement.query(By.directive(ScaleButtonDirective));
    div.nativeElement.dispatchEvent(mouseenter);
    fixture.detectChanges();
    expect(div.nativeElement.className).toBe("scale");
  });

  it("should log mouseleave element", () => {
    const div: DebugElement = fixture.debugElement.query(By.directive(ScaleButtonDirective));
    div.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();
    expect(div.nativeElement.className).toBe("scale");

    div.nativeElement.dispatchEvent(mouseleave);
    fixture.detectChanges();
    expect(div.nativeElement.className).toBe("");
  });
});
