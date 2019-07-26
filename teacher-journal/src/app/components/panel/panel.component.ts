import { Component } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";
import { PANEL_NAVIGATION } from "src/app/common/constants/data-constants";
import { DataService } from "src/app/common/services/data.service";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"]
})
export class PanelComponent {
  private title: String = "Teacher journal";
  public translate: TranslateService;
  public navigationName: string[] = [];
  public dataService: DataService;

  constructor(translate: TranslateService, dataService: DataService) {
    this.dataService = dataService;
    this.translate = translate;
    this.translate.addLangs(["en", "ru"]);
    this.translate.setDefaultLang("en");

    this.dataService.getNamePanel(PANEL_NAVIGATION).subscribe((data: string[])  => this.navigationName = data);
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : "en");
  }
}
