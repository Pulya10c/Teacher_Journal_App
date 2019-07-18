import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";

import runModalDialog from "src/app/common/helpers/modal-form-guard";

@Injectable()
export class SubjectPageGuard implements CanActivate {
  public canActivate(): Observable<boolean> | boolean {
    return runModalDialog(
      "Only for teachers!",
      "Here may you are watching and correcting the marks of the students. Are you sure you want to watch?"
    );
  }
}
