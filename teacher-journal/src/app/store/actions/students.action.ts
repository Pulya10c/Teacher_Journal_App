import { createAction, ActionCreator, props } from "@ngrx/store";

import { IStudent } from "src/app/common/entities/student";
import { TypedAction } from "@ngrx/store/src/models";

export const loadStudents: ActionCreator<string> = createAction("[Students] Load Students");

export const addStudent: ActionCreator<
  string,
  (props: { newStudent: IStudent }) => { newStudent: IStudent } & TypedAction<string>
> = createAction(
  "[Students] Add Student",
  props<{ newStudent: IStudent }>()
);
