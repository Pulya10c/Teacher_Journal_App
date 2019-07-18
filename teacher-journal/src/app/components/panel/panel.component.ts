import { Component } from "@angular/core";

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"]
})
export class PanelComponent {
  private title: String = "Teacher journal";
  public translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
    this.translate.addLangs(["en", "ru"]);
    this.translate.setDefaultLang("en");

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : "en");
  }
}
