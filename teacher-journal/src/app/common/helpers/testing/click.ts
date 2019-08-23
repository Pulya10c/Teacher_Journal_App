import { DebugElement } from "@angular/core";

export const buttonClickEvents: any = {
    left:  {
        button: 0
    },
    right: {
        button: 2
    }
 };

export function click(el: DebugElement | HTMLElement, eventObj: any = buttonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler("click", eventObj);
  }
}
