import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { selectStudents } from "src/app/redux/selectors/combine.selectors";
import { IStudent } from "src/app/common/entities/student";
import { IState } from "src/app/common/entities/state";
import { FindMarksService } from "src/app/common/services/find-marks.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "statistics-students",
  templateUrl: "./statistics-students.component.html",
  styleUrls: ["./statistics-students.component.scss"]
})
export class StatisticsStudentsComponent implements OnInit {
  private store: Store<IState>;
  private componentDestroyed: Subject<any> = new Subject();
  public students: IStudent[] = [];
  public findMarksService: FindMarksService;

  constructor(store: Store<IState>, findMarksService: FindMarksService) {
    this.store = store;
    this.findMarksService = findMarksService;
  }

  private initStudentList(): void {
    this.store
      .pipe(
        select(selectStudents),
        takeUntil(this.componentDestroyed)
      )
      .subscribe(data => {
        if (data.length) {
          this.students = data;
        }
      });
  }

  public ngOnInit(): void {
    this.initStudentList();
  }

  public ngOnDestroy (): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
