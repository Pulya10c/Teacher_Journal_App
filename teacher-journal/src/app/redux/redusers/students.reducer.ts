import { createReducer, on, ActionReducer, Action } from "@ngrx/store";

import { loadStudents, addStudent, updateStudents, initAddStudent } from "../actions/students.action";
import { IStudentState } from "src/app/common/entities/students-state";

const initialStudentsState: IStudentState = {
  students: []
};

const studentReducer: ActionReducer<IStudentState, Action> = createReducer<IStudentState>(
  initialStudentsState,
  on(
    updateStudents,
    (state) => {
    return { ...state };
  }),
  on(
    loadStudents,
    (state, { student }) => {
    return {
      ...state,
      students: [...student]
    };
  }),
  on(
    initAddStudent,
    (state, { newStudent }) => {
    return {
      ...state
    };
  }),
  on(
    addStudent,
    (state, { newStudent }) => {
    return {
      ...state,
      students: [...state.students, newStudent]
    };
  })
);

export function reducerStudent(state: IStudentState, action: Action): IStudentState {
  return studentReducer(state, action);
}
