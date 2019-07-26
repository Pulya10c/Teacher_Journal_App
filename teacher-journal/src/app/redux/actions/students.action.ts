import { createAction, ActionCreator, props } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";

import { IStudent } from "src/app/common/entities/student";

export const updateStudents: ActionCreator<
  string,
  () => TypedAction<string>
> = createAction(
  "[Students] Start Load Student"
);

export const initAddStudent: ActionCreator<
  string,
  (props: { newStudent: IStudent }) => { newStudent: IStudent } & TypedAction<string>
> = createAction(
  "[Students] Initialization Add Student",
  props<{ newStudent: IStudent }>()
);

export const loadStudents: ActionCreator<
  string,
  (props: { student: IStudent[] }) => { student: IStudent[] } & TypedAction<string>
> = createAction(
  "[Students] Load Students",
  props<{ student: IStudent[] }>()
);

export const addStudent: ActionCreator<
  string,
  (props: { newStudent: IStudent }) => { newStudent: IStudent } & TypedAction<string>
> = createAction(
  "[Students] Add Student",
  props<{ newStudent: IStudent }>()
);
