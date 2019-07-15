import { createAction, ActionCreator, props } from "@ngrx/store";

import { IStudent } from "src/app/common/entities/student";

// import { Action } from "@ngrx/store";

// import { IStudent } from "../../common/entities/student";

// export enum ActionTypes {
//   LOAD_STUDENTS = "[Students] Load Students",
//   ADD_STUDENT = "[Students] Add Student"
// }

// export class LoadStudents implements Action {
//   public readonly type: string = ActionTypes.LOAD_STUDENTS;
//   public payload: IStudent[];
//   constructor(payload: IStudent[]) {
//     this.payload = payload;
//   }
// }

// export class AddStudent implements Action {
//   public readonly type: string = ActionTypes.ADD_STUDENT;
//   public payload: IStudent[];
//   constructor(payload: IStudent[]) {
//     this.payload = payload;
//   }
// }

// export type StudentsAction =
//   | LoadStudents
//   | AddStudent;

// tslint:disable-next-line: variable-name
export const LoadStudents: ActionCreator<string, any> = createAction("[Students] Load Students", props<{ studentList: IStudent[] }>());
// tslint:disable-next-line: variable-name
export const AddStudent: ActionCreator<string, any> = createAction("[Students] Add Student", props<{ newStudent: IStudent } >());
