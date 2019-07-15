import { ActionCreator, createAction, props } from "@ngrx/store";

import { ISubject } from "src/app/common/entities/subject";

// import { Action } from "@ngrx/store";

// import { ISubject } from "../../common/entities/subject";

// export enum ActionTypesSubject {
//   LOAD_SUBJECTS = "[Subjects] Load Subjects",
//   ADD_SUBJECT = "[Subjects] Add Subject",
//   MARKS_TO_CHANGE_SUBJECT = "[Subjects] Marks To Change Subject",
// }

// export class LoadSubjects implements Action {
//   public readonly type: string = ActionTypesSubject.LOAD_SUBJECTS;
//   public payload: ISubject[];
//   constructor(payload: ISubject[]) {
//     this.payload = payload;
//   }
// }

// export class AddSubject implements Action {
//   public readonly type: string = ActionTypesSubject.ADD_SUBJECT;
//   public payload: ISubject[];
//   constructor(payload: ISubject[]) {
//     this.payload = payload;
//   }
// }

// export class MarksToChangeSubject implements Action {
//   public readonly type: string = ActionTypesSubject.MARKS_TO_CHANGE_SUBJECT;
//   public payload: ISubject[];
//   constructor(payload: ISubject[]) {
//     this.payload = payload;
//   }
// }

// export type SubjectsAction =
//   | LoadSubjects
//   | AddSubject
//   | MarksToChangeSubject;

// tslint:disable-next-line: variable-name
export const LoadSubject: ActionCreator<string, any> = createAction(
  "[Subjects] Load Subjects",
  props<{ subjectsList: ISubject[] }>()
);
// tslint:disable-next-line: variable-name
export const AddSubject: ActionCreator<string, any> = createAction(
  "[Subjects] Add Subject",
  props<{ newSubject: ISubject }>()
);
// tslint:disable-next-line: variable-name
export const MarksToChangeSubject: ActionCreator<string, any> = createAction(
  "[Subjects] Marks To Change Subject",
  props<{ changeSubject: ISubject }>()
);
