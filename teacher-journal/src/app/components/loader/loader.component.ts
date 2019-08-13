import { Component } from "@angular/core";

import { Subject } from "rxjs";

import { LoaderService } from "../../common/services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})

export class LoaderComponent {
  private loaderService: LoaderService;
  public isLoading$: Subject<boolean>;

  constructor(loaderService: LoaderService) {
    this.loaderService = loaderService;
    this.isLoading$ = this.loaderService.isLoading;
  }
}
