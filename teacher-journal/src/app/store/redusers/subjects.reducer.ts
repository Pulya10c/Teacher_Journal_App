
import { ActionReducer, createReducer, on, Action } from "@ngrx/store";

import { ISubjectState } from "src/app/common/entities/subjects-state";
import {
  marksToChangeSubject,
  loadSubjects,
  addSubject,
  initMarksToChangeSubject,
  initAddSubject,
  updateSubjects
} from "../actions/subjects.action";

const initialStudentsState: ISubjectState = {
  subjects: []
};

const subjectsReducer: ActionReducer<ISubjectState, Action> = createReducer<ISubjectState>(
  initialStudentsState,
  on(
    updateSubjects,
    (state) => {
    return {
      ...state
    };
  }),
  on(
    loadSubjects,
    (state, { subject }) => {
    return {
      ...state,
      subjects: [...subject]
    };
  }),
  on(
    initAddSubject,
    (state, { newSubject }) => {
    return {
      ...state
    };
  }),
  on(
    addSubject,
    (state, { newSubject }) => {
    return {
      ...state,
      subjects: [...state.subjects, newSubject]
    };
  }),
  on(
    initMarksToChangeSubject,
    (state, { subject }) => {
    return {
      ...state
    };
  }),
  on(
    marksToChangeSubject,
    (state, { subject } ) => {
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
