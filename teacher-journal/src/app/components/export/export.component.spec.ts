import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ExportComponent } from "./export.component";

describe("ExportComponent", () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;
  let pdfDE: DebugElement;
  let excelDE: DebugElement;
  let elementPdf: any;
  let elementExcel: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it("should create component instance", () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it("should have relevant icon pdf in tags", () => {
    pdfDE = fixture.debugElement.query(By.css(".export-pdf-img"));
    elementPdf = pdfDE.nativeElement;
    expect(elementPdf.src).toContain("/pdf-icon.png");
  });

  it("should have relevant icon excel in tags", () => {
    excelDE = fixture.debugElement.query(By.css(".export-excel-img"));
    elementExcel = excelDE.nativeElement;
    expect(elementExcel.src).toContain("/xlsx-icon.png");
  });

});
