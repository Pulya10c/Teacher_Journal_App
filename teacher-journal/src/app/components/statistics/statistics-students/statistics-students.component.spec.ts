import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StatisticsStudentsComponent } from "./statistics-students.component";

describe("StatisticsStudentsComponent", () => {
  let component: StatisticsStudentsComponent;
  let fixture: ComponentFixture<StatisticsStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsStudentsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
