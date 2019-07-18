import { Observable } from "rxjs";

export interface IComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
