import { Component,
  ViewContainerRef,
  ViewChild,
  ComponentFactory,
  ComponentRef,
  ComponentFactoryResolver
} from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { PANEL_NAVIGATION } from "src/app/common/constants/data-constants";
import { DataService } from "src/app/common/services/data.service";
import { MessageComponent } from "src/app/shared/components/message/message.component";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"]
})

export class PanelComponent {
  @ViewChild("messageWelcome", { read: ViewContainerRef, static: true }) private entry: ViewContainerRef;
  private resolver: ComponentFactoryResolver;
  public title: String = "Teacher journal";
  public translate: TranslateService;
  public navigationName: string[] = [];
  public dataService: DataService;

  constructor(translate: TranslateService, dataService: DataService, resolver: ComponentFactoryResolver) {
    this.resolver = resolver;
    this.dataService = dataService;
    this.translate = translate;
    this.translate.addLangs(["en", "ru"]);
    this.translate.setDefaultLang("en");

    this.dataService.getNamePanel(PANEL_NAVIGATION).subscribe((data: string[]) => (this.navigationName = data));
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : "en");
  }

  public createComponent(message: string): void {
    console.dir(message);
    this.entry.clear();
    const factory: ComponentFactory<MessageComponent> = this.resolver.resolveComponentFactory(MessageComponent);
    const componentRef: ComponentRef<MessageComponent> = this.entry.createComponent(factory);
    componentRef.instance.message = message;
  }
}
