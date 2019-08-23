import { Component, DebugElement } from "@angular/core";
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { MessageComponent } from "./message.component";
import { By } from "@angular/platform-browser";
import { click } from "src/app/common/helpers/testing/click";

@Component({
  template: `
    <app-message [message]="message" [textMessage]="textMessage" [modalClose]="modalClose"> </app-message>
  `
})
class TestHostComponent {
  public expectedClickOK: string;
  public expectedClickClose: string;
  public message: string = "Techer journal";
  public textMessage: string = "Would you like to tell about teacher journal";
  constructor() {
    this.modalClose = this.modalClose.bind(this);
  }
  public modalClose: Function = function(): void {
    this.expectedClickOK = "OK";
    this.expectedClickClose = "Close";
  };
}

describe("Message", () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.modalClose = component.modalClose.bind(this);
    fixture.detectChanges();
  });

  it("should be create component instance", () => {
    expect(component).toBeDefined();
  });

  it("should have a text in a header", () => {
    const compiled: any = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".modal-content-header").textContent).toContain(component.message);
  });

  it("should have a text message in a body", () => {
    const compiled: any = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".modal-content-text").textContent).toContain(component.textMessage);
  });

  it("when the button Close is clicked, the click() method is called", () => {
    let de: DebugElement = fixture.debugElement.query(By.css(".modal-close"));
    click(de);
    expect(component.expectedClickClose).toBe("Close");
  });

  it("when the button OK is clicked, the click() method is called", () => {
    let de: DebugElement = fixture.debugElement.query(By.css(".modal-content-button"));
    click(de);
    expect(component.expectedClickOK).toBe("OK");
  });
});
