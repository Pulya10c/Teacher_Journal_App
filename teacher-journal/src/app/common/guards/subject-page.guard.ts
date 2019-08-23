import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class SubjectPageGuard implements CanActivate {
  public router: Router;
  public isLoggerIn: boolean | undefined;
  constructor(router: Router) {
    this.router = router;
  }

  public canActivate(): Observable<boolean> | boolean {
    this.isLoggerIn = localStorage.getItem("Jurnal_App_access")
    ? localStorage.getItem("Jurnal_App_access") === "true" ? true : false
    : undefined;

    if (this.isLoggerIn) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
