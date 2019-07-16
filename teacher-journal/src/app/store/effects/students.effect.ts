// import { Injectable } from "@angular/core";
// import { Actions, Effect, ofType } from "@ngrx/effects";
// import { AddStudent, LoadStudents } from "../actions/students.action";
// import { map, catchError, mergeMap } from "rxjs/operators";
// import { DataService } from "src/app/common/services/data.service";
// import { of, Observable } from "rxjs";
// import { IStudent } from "src/app/common/entities/student";
// import { URL_DB, DB_STUDENTS } from "src/app/common/constants/data-constants";
// import { IStudentState } from "src/app/common/entities/students-state";

// @Injectable()
// export class StudentsEffects {
//   private actions$: Actions;
//   private dataService: DataService;

//   @Effect()
//   public loadStudents$: Observable<IStudentStore> = this.actions$.pipe(
//     ofType(LoadStudents),
//     mergeMap(() =>
//       this.dataService.getHttp<IStudent>(URL_DB, DB_STUDENTS).pipe(
//         map(students => new LoadStudents(students)),
//         catchError(error => {
//           console.log("ERROR", error);
//           return of({ student: [] });
//         })
//       )
//     )
//   );

//   // @Effect()
//   // public addStudent$: Observable<any> = this.actions$.pipe(
//   //   ofType(addStudent),
//   //   map(action => action),
//   //   mergeMap(student => {

//   //     return this.dataService.addNewStudent(student).pipe(
//   //       map(s => new AddStudentSuccess(s)),
//   //       catchError(error => of(new AddStudentFail(error)))
//   //     );
//   //   })
//   // );

//   constructor(actions$: Actions, dataService: DataService) {
//     this.actions$ = actions$;
//     this.dataService = dataService;
//   }
// }
