import { Directive, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
  selector: "[scaleButton]"
})
export class ScaleButtonDirective {
  private buttonSubject: ElementRef;
  private renderer: Renderer2;

  constructor(element: ElementRef, renderer: Renderer2) {
    this.buttonSubject = element;
    this.renderer = renderer;
  }

  @HostListener("mouseenter") private onMouseEnter(): void {
    this.renderer.addClass(this.buttonSubject.nativeElement, "scale");
  }

  @HostListener("mouseleave") private onMouseLeave(): void {
    this.renderer.removeClass(this.buttonSubject.nativeElement, "scale");
  }
}
