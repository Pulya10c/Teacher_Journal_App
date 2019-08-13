import { Directive, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
  selector: "[elementSize]"
})
export class ElementSizeDirective {
  private element: ElementRef;
  private renderer: Renderer2;

  constructor(element: ElementRef, renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
  }

  @HostListener("mouseenter") public onMouseEnter(): void {
    this.renderer.addClass(this.element.nativeElement, "active");
  }

  @HostListener("mouseleave") public onMouseLeave(): void {
    this.renderer.removeClass(this.element.nativeElement, "active");
  }

}
