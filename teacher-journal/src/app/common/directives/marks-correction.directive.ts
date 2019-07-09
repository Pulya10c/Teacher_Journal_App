import { Directive } from "@angular/core";
import { NG_VALIDATORS, FormControl, Validator } from "@angular/forms";

@Directive({
  selector: "[corrector]",
  providers: [
    { provide: NG_VALIDATORS, useExisting:  MarksCorrectionDirective, multi: true }
  ]
})
export class MarksCorrectionDirective implements Validator {
public  validate( mark: FormControl): any {
    const inputValue: number = mark.value;
    return inputValue > 0 && inputValue <= 10
      ? 0
      : { corrector: true };
  }
}
