import { VisibilityDirective } from "./visibility.directive";
import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <p appVisibility [valueMark]="mark"></p>
  `
})
class TestComponent {
  public mark: number = 0;
}

describe("VisibilityDirective", () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let keyup: KeyboardEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, VisibilityDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.componentInstance;
    keyup = new KeyboardEvent("keyup");
    component.mark = 5;
  });

  it("should create an instance", () => {
    expect(component).toBeTruthy();
  });

  it("should log keyup intro element", () => {
    const p: DebugElement = fixture.debugElement.query(By.directive(VisibilityDirective));
    component.mark = 7;
    fixture.detectChanges();
    p.nativeElement.dispatchEvent(keyup);
    expect(p.nativeElement.style.color).toBe("");
  });

  it("should color the border of element in red when entering a score greater than 10 or less or equal to 0", () => {
    const p: DebugElement = fixture.debugElement.query(By.directive(VisibilityDirective));
    component.mark = 15;
    fixture.detectChanges();
    p.nativeElement.dispatchEvent(keyup);
    expect(p.nativeElement.style.color).toBe("red");
    component.mark = 0;
    fixture.detectChanges();
    p.nativeElement.dispatchEvent(keyup);
    expect(p.nativeElement.style.color).toBe("red");
  });
});
