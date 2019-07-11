import { Injectable } from "@angular/core";
import { IComponentCanDeactivate } from "../../../common/entities/component-can-deactivate";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class ExitSubjectPageGuard
  implements CanDeactivate<IComponentCanDeactivate> {
  public canDeactivate(
    component: IComponentCanDeactivate
  ): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
