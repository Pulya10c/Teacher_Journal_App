import { Component, OnInit } from "@angular/core";
import { Subject, of, from } from "rxjs";
import { LoaderService } from "src/app/common/services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent {
  private loaderService: LoaderService;
  private isLoading: Subject<boolean>;

  constructor(loaderService: LoaderService) {
    this.loaderService = loaderService;
    this.isLoading = this.loaderService.isLoading;
  }
}
