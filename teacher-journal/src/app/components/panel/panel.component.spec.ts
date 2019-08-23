import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { PanelComponent } from "./panel.component";
import { Directive, HostListener, Input, Component, DebugElement, NO_ERRORS_SCHEMA, ComponentFactory, NgModule } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { click } from "src/app/common/helpers/testing/click";
import { MessageComponent } from "src/app/shared/components/message/message.component";
import { DataService } from "src/app/common/services/data.service";
import { of } from "rxjs";

@Component({ selector: "notification", template: "" })
export class MockNotificationComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [MessageComponent],
  entryComponents: [MessageComponent]
})
export class FakeTestDialogModule {}

@Directive({
  selector: "[routerLink]"
})
export class RouterLinkDirectiveStub {
  @Input("routerLink") public linkParams: any;
  public navigatedTo: any = undefined;

  @HostListener("click")
  public onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

describe("PanelComponent", () => {
  let navigationName: string[] = ["students", "subjects", "statistics", "export"];
  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;
  let de: DebugElement;
  let element: any;
  let dataService: DataService;
  let spyGetNamePanel: jasmine.Spy;
  let spyGetAboutAs: jasmine.Spy;
  let spyCloseComponent: jasmine.Spy;
  const en: any = {
    title: "Teacher Journal",
    langviges: "language",
    students: "Students",
    subjects: "Subjects",
    statistics: "Statistics",
    export: "Export"
  };
  const ru: any = {
    title: "Журнал учителя",
    langviges: "язык",
    students: "Ученики",
    subjects: "Предметы",
    statistics: "Статистика",
    export: "Экспорт"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelComponent, RouterLinkDirectiveStub, MockNotificationComponent],
      imports: [FakeTestDialogModule, HttpClientTestingModule, HttpClientModule, TranslateModule.forRoot()],
      providers: [DataService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    component.navigationName = navigationName;
    component.translate.store.translations.en = en;
    component.translate.store.translations.ru = ru;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(item => item.injector.get(RouterLinkDirectiveStub));
    dataService = fixture.debugElement.injector.get(DataService);
    spyGetNamePanel = spyOn(dataService, "getNamePanel").and.returnValue(of(navigationName));
    spyGetAboutAs = spyOn(dataService, "getAboutAs").and.returnValue(of("test text for message"));
    spyCloseComponent = spyOn(component, "closeComponent");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call DataService.getNamePanel", () => {
    component.init();
    expect(spyGetNamePanel.calls.any()).toBeTruthy();
  });

  it("should call DataService.getAboutAs", () => {
    component.createFactoryComponent("Test name header for message");
    expect(spyGetAboutAs.calls.any()).toBeTruthy();
  });

  it("should have default language English", () => {
    de = fixture.debugElement.query(By.css(".header__language-select"));
    element = de.nativeElement;
    expect(element.value).toBe("en");
  });

  it("checking the values in the template for compliance when choosing the English language", () => {
    de = fixture.debugElement.query(By.css(".header__name"));
    element = de.nativeElement;
    expect(element.textContent).toBe(en.title);
    de = fixture.debugElement.query(By.css(".header__language"));
    element = de.nativeElement;
    expect(element.textContent).toContain(en.langviges);
  });

  it("language should change when 'header__language-select' changes", fakeAsync(() => {
    const select: DebugElement = fixture.debugElement.query(By.css("select"));
    const nycOption: DebugElement[] = fixture.debugElement.queryAll(By.css("option"));

    expect(select.nativeElement.value).toEqual("en");
    expect(component.translate.currentLang).toEqual("en");
    expect(nycOption[0].nativeElement.selected).toBe(true);
    expect(nycOption[1].nativeElement.selected).toBe(false);

    select.nativeElement.value = "ru";
    select.triggerEventHandler("change", 0);
    tick();
    fixture.detectChanges();

    expect(select.nativeElement.value).toEqual("ru");
    expect(component.translate.currentLang).toEqual("ru");
    expect(nycOption[1].nativeElement.selected).toBe(true);
    expect(nycOption[0].nativeElement.selected).toBe(false);
  }));

  it("checking the values in the template for compliance when choosing the Russian language", () => {
    const select: DebugElement = fixture.debugElement.query(By.css("select"));
    select.nativeElement.value = "ru";
    select.triggerEventHandler("change", 0);
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css(".header__name"));
    element = de.nativeElement;
    expect(element.textContent).toBe(ru.title);
    de = fixture.debugElement.query(By.css(".header__language"));
    element = de.nativeElement;
    expect(element.textContent).toContain(ru.langviges);
  });

  it("can get RouterLinks from template", () => {
    expect(routerLinks.length).toBe(4, "should have 4 routerLinks");
    expect(routerLinks[0].linkParams).toBe("/students");
    expect(routerLinks[1].linkParams).toBe("/subjects");
    expect(routerLinks[2].linkParams).toBe("/statistics");
    expect(routerLinks[3].linkParams).toBe("/export");
  });

  it("can click RouterLinks link in template", () => {
    const link: string[] = ["/students", "/subjects", "/statistics", "/export"];
    routerLinks.forEach((routerLink, index) => {
      expect(routerLink.navigatedTo).toBeUndefined("should not have navigated yet");
      click(linkDes[index]);
      fixture.detectChanges();
      expect(routerLink.navigatedTo).toBe(link[index]);
    });
  });

  it("creating a dynamic component", fakeAsync(() => {
    component.createFactoryComponent("Test name header for message");
    tick();
    fixture.detectChanges();
    expect(component.componentRef).toBeTruthy();
    const testDynamicComponent: DebugElement = fixture.debugElement.query(By.css(".modal-content-header"));
    expect(component.componentRef.instance.message).toBe(testDynamicComponent.nativeElement.textContent);
    spyCloseComponent();
  }));

  it("when you click on the 'header__logo', the function should be called", fakeAsync(() => {
    spyOn(component, "createFactoryComponent");
    const logo: DebugElement = fixture.debugElement.nativeElement.querySelector(".header__logo");
    click(logo);
    tick();
    fixture.detectChanges();
    expect(component.createFactoryComponent).toHaveBeenCalled();
  }));
});
