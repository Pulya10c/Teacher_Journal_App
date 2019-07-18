import { Injectable } from "@angular/core";

import { Actions, ofType, createEffect } from "@ngrx/effects";
import { TypedAction } from "@ngrx/store/src/models";

import { Observable } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { DataService } from "src/app/common/services/data.service";
import { URL_DB, DB_SUBJECTS, URL_DB_SUBJECTS } from "src/app/common/constants/data-constants";
import { ISubject } from "src/app/common/entities/subject";
import {
  loadSubjects,
  addSubject,
  initAddSubject,
  updateSubjects,
  initMarksToChangeSubject,
  marksToChangeSubject
} from "../actions/subjects.action";

@Injectable()
export class SubjectsEffects {
  private actions$: Actions;
  private dataService: DataService;

  public loadSubjects$: Observable<{ subject: ISubject[]; } & TypedAction<string>>;
  public addSubject$: Observable<{ newSubject: ISubject; } & TypedAction<string>>;
  public changeSubject$: Observable<{ subject: ISubject; } & TypedAction<string>>;

  constructor(actions$: Actions, dataService: DataService) {
    this.actions$ = actions$;
    this.dataService = dataService;

    this.loadSubjects$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateSubjects),
        mergeMap(
          () => this.dataService
          .getHttp<ISubject>(URL_DB, DB_SUBJECTS)
          .pipe(
            map(subjects => loadSubjects({ subject: subjects })),
          )
        )
      )
    );

    this.addSubject$ = createEffect(() =>
      this.actions$.pipe(
        ofType(initAddSubject),
        map(
          (action: { newSubject: ISubject; } & TypedAction<string>) => action.newSubject
        ),
        mergeMap(
          (subject) =>
          this.dataService
          .postHttp<ISubject>(URL_DB_SUBJECTS, subject)
          .pipe(
            map(response => addSubject({ newSubject: response })),
          )
        )
      )
    );

    this.changeSubject$ = createEffect(() =>
      this.actions$.pipe(
        ofType(initMarksToChangeSubject),
        map(
          (action: { subject: ISubject; } & TypedAction<string>) => action.subject
        ),
        mergeMap(
          (changeSubject) =>
          this.dataService
          .putHttp(URL_DB_SUBJECTS, changeSubject)
          .pipe(
            map(response => marksToChangeSubject({ subject: response })),
          )
        )
      )
    );
  }
}
