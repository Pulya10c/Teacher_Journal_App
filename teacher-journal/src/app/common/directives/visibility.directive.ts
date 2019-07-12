import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input
} from "@angular/core";

@Directive({
  selector: "[appVisibility]"
})
export class VisibilityDirective {
  private element: ElementRef;
  private renderer: Renderer2;

  @Input() public valueMark: number;

  constructor(element: ElementRef, renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
  }

  @HostListener("keyup") private onKeyUp(): void {
    if (this.valueMark < 0 || this.valueMark > 10 || this.valueMark === 0) {
      this.renderer.setStyle(this.element.nativeElement, "color", "red");
    }
    if (this.valueMark > 0 && this.valueMark < 10 || this.valueMark === undefined) {
      this.renderer.removeStyle(this.element.nativeElement, "color");
    }
  }
}
