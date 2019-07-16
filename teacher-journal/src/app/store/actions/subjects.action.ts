import { ActionCreator, createAction, props } from "@ngrx/store";

import { ISubject } from "src/app/common/entities/subject";
import { TypedAction } from "@ngrx/store/src/models";

export const loadSubjects: ActionCreator<string, any> = createAction("[Subjects] Load Subjects");

export const addSubject: ActionCreator<
  string,
  (props: { newSubject: ISubject }) => { newSubject: ISubject } & TypedAction<string>
> = createAction(
  "[Subjects] Add Subject",
  props<{ newSubject: ISubject }>()
);

export const marksToChangeSubject: ActionCreator<
  string,
  (props: { subject: ISubject }) => { subject: ISubject } & TypedAction<string>
> = createAction(
  "[Subjects] Marks To Change Subject",
  props<{ subject: ISubject }>()
);
