import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class SubjectPageGuard implements CanActivate {
  public router: Router;
  public authTeacher: boolean;
  constructor(router: Router) {
    this.router = router;
  }

  public canActivate(): Observable<boolean> | boolean {
    this.authTeacher = localStorage.getItem("Jurnal_App_access") === "true" ? true : false;
    if (this.authTeacher) {
      return true;
    } else {
      this.router.navigate(["/forbidden"]);
      return false;
    }
  }
}
