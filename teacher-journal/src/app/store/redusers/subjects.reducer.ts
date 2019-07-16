
import { ActionReducer, createReducer, on, Action } from "@ngrx/store";

import { ISubjectState } from "src/app/common/entities/subjects-state";
import { marksToChangeSubject, loadSubjects, addSubject } from "../actions/subjects.action";

const initialStudentsState: ISubjectState = {
  subjects: []
};

const subjectsReducer: ActionReducer<ISubjectState, Action> = createReducer<ISubjectState>(
  initialStudentsState,
  on(loadSubjects, (state) => {
    return {
      ...state
    };
  }),
  on(addSubject, (state, { newSubject }) => {
    return {
      ...state,
      subjects: [...state.subjects, newSubject]
    };
  }),
  on(marksToChangeSubject, (state, { subject } ) => {
    return {
      ...state,
      subjects: [
        ...state.subjects
        .filter(
          item => item.nameSubject !== subject.nameSubject
        ),
        subject
      ]
    };
  })
);

export function reducerSubject(state: ISubjectState, action: Action): ISubjectState {
  return subjectsReducer(state, action);
}
