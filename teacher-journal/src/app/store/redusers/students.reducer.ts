import { createReducer, on, ActionReducer, State, Action } from "@ngrx/store";

import { IStudentStore } from "src/app/common/entities/students-store";
// import * as studentPageActions from "../actions/students.action";
import { LoadStudents, AddStudent } from "../actions/students.action";

// import { IStudentStore } from "src/app/common/entities/students-store";
// import { StudentsAction, ActionTypes } from "../actions/students.action";
// import { on, createReducer } from '@ngrx/store';

const initialStudentsState: IStudentStore = {
  students: []
};

// export function studentsReducer(
//   state: IStudentStore = initialStudentsState,
//   action: StudentsAction
// ): IStudentStore {
//   switch (action.type) {
//     case ActionTypes.LOAD_STUDENTS:
//       return {
//         students: [...action.payload]
//       };
//     case ActionTypes.ADD_STUDENT:
//       return {
//         students: [...action.payload]
//       };
//     default:
//       return state;
//   }
// }

const studentReducer: ActionReducer<any> = createReducer<IStudentStore>(
  initialStudentsState,
  on(LoadStudents, (state, { studentList }) => {
    return ({ ...state, students: [...studentList] });
  }),
  on(AddStudent, (state, { newStudent }) => {
    return ({ ...state, students: [...state.students, newStudent] });
  })
);

export function reducer(state: State<IStudentStore>, action: Action): ActionReducer<IStudentStore> {
  return studentReducer(state, action);
}
// switch (action.type) {
//   case ActionTypes.LOAD_STUDENTS:
//     return {
//       students: [...action.payload]
//     };
//   case ActionTypes.ADD_STUDENT:
//     return {
//       students: [...action.payload]
//     };
//   default:
//     return state;
// }
// }
