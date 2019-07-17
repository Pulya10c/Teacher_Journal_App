import { ActionCreator, createAction, props } from "@ngrx/store";

import { ISubject } from "src/app/common/entities/subject";
import { TypedAction } from "@ngrx/store/src/models";

export const updateSubjects: ActionCreator<
  string,
  () => TypedAction<string>
> = createAction(
  "[Subjects] Start Load Subject"
);

export const initAddSubject: ActionCreator<
  string,
  (props: { newSubject: ISubject }) => { newSubject: ISubject } & TypedAction<string>
> = createAction(
  "[Subjects] Initialization Add Subject",
  props<{ newSubject: ISubject }>()
);

export const initMarksToChangeSubject: ActionCreator<
  string,
  (props: { subject: ISubject }) => { subject: ISubject } & TypedAction<string>
> = createAction(
  "[Subjects] Initialization Marks To Change Subject",
  props<{ subject: ISubject }>()
);

export const loadSubjects: ActionCreator<
  string,
  (props: { subject: ISubject[] }) => { subject: ISubject[] } & TypedAction<string>
  > = createAction(
  "[Subjects] Load Subjects",
  props<{ subject: ISubject[] }>()
  );

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
