import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, Navigation } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { selectSubjects, selectDropdown } from "src/app/redux/selectors/combine.selectors";
import { FindMarksService } from "src/app/common/services/find-marks.service";
import { DropdownService } from "src/app/common/services/dropdown.service";
import { IDropdown } from "src/app/common/entities/dropdown";
import { ISubject } from "src/app/common/entities/subject";
import { IState } from "src/app/common/entities/state";

@Component({
  selector: "statistics-info",
  templateUrl: "./statistics-info.component.html",
  styleUrls: ["./statistics-info.component.scss"]
})

export class StatisticsInfoComponent implements OnInit {
  private router: Router;
  private store: Store<IState>;
  private subjects: ISubject[];
  private componentDestroyed$: Subject<any> = new Subject();
  public studentDataForDraw: { subject: string; marksList: number[] }[] = [];
  public student: { id: string; name: string; lastName: string } = { id: "", name: "", lastName: "" };
  public findMarksService: FindMarksService;
  public dataDropdown: IDropdown[] = [];
  public averageRating: number;
  public isVisible: boolean = false;
  public rating: string[] = ["0%", "0%", "0%", "0%", "0%"];

  constructor(router: Router, findMarksService: FindMarksService, store: Store<IState>, dropdownService: DropdownService) {
    this.findMarksService = findMarksService;
    this.router = router;
    this.store = store;
  }

  private initInfo(): void {
    this.store
      .pipe(
        select(selectSubjects),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(data => {
        if (data.length) {
          this.subjects = data;
        }
      });

    this.store
      .pipe(
        select(selectDropdown),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(data => {
          this.dataDropdown = data;
      });

    this.router.events.pipe(takeUntil(this.componentDestroyed$)).subscribe(event => {
      this.isVisible = false;
      if (event instanceof NavigationEnd && event.url.match(/statistics\/students\//gi)) {
        this.isVisible = true;
        const navigation: Navigation = this.router.getCurrentNavigation();
        const student: string = event.url.split("/").pop();

        this.student.id = navigation.extras.state ? navigation.extras.state.id : "";
        this.student.name = student.split("_")[0];
        this.student.lastName = student.split("_")[1];
        this.studentDataForDraw = [...this.findMarksService.getMarks(this.student.id, this.subjects, this.dataDropdown)];

        this.studentDataForDraw = this.studentDataForDraw.length ? this.studentDataForDraw : [];

        this.averageRating =
          this.studentDataForDraw
            .filter(({ marksList }) => marksList.length)
            .reduce((allMarks, { marksList }) => [...allMarks, ...marksList], [])
            .reduce((summa, mark, idx, sourceArr) => summa + mark / sourceArr.length, 0) / 2;

        this.rating = Array(5)
          .fill("100%")
          .map((item, idx) =>
            this.averageRating - idx >= 1
              ? item
              : (this.averageRating - idx) * 100 > 0
              ? ((this.averageRating - idx) * 100).toFixed(0) + "%"
              : "0%"
          );
      }
    });
  }

  public ngOnInit(): void {
    this.initInfo();
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
