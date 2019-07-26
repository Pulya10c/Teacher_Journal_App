import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { addStudent, loadStudents, updateStudents, initAddStudent } from "../actions/students.action";
import { map, catchError, mergeMap } from "rxjs/operators";
import { DataService } from "src/app/common/services/data.service";
import { Observable } from "rxjs";
import { IStudent } from "src/app/common/entities/student";
import { URL_DB, DB_STUDENTS, URL_DB_STUDENTS } from "src/app/common/constants/data-constants";
import { TypedAction } from "@ngrx/store/src/models";

@Injectable()
export class StudentsEffects {
  private actions$: Actions;
  private dataService: DataService;

  public loadStudents$: Observable<{ student: IStudent[]; } & TypedAction<string>>;
  public addStudents$: Observable<{ newStudent: IStudent; } & TypedAction<string>>;

  constructor(actions$: Actions, dataService: DataService) {
    this.actions$ = actions$;
    this.dataService = dataService;

    this.loadStudents$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateStudents),
        mergeMap(
          () => this.dataService
          .getHttp<IStudent>(URL_DB, DB_STUDENTS)
          .pipe(
            map(students => loadStudents({ student: students })),
          )
        )
      )
    );

    this.addStudents$ = createEffect(() =>
      this.actions$.pipe(
        ofType(initAddStudent),
        map(
          (action: { newStudent: IStudent; } & TypedAction<string>) => action.newStudent
        ),
        mergeMap(
          (student) =>
          this.dataService
          .postHttp<IStudent>(URL_DB_STUDENTS, student)
          .pipe(
            map(response => addStudent({ newStudent: response })),
          )
        )
      )
    );
  }
}
