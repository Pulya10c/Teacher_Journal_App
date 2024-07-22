import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { IComponentCanDeactivate } from "../entities/component-can-deactivate";

@Injectable()
export class ExitSubjectPageGuard implements CanDeactivate<IComponentCanDeactivate> {
  public canDeactivate(component: IComponentCanDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
