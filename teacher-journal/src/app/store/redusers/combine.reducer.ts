import { combineReducers, ActionReducer } from "@ngrx/store";
import * as subjectsReducer from "./subjects.reducer";
import * as studentsReducer from "./students.reducer";
import { ISubject } from "src/app/common/entities/subject";
import { ISubjectStore } from "src/app/common/entities/subjects-store";
import { Action } from "@ngrx/store";
import { IStudentStore } from "src/app/common/entities/students-store";
import { IState } from "src/app/common/entities/state";

// import { ActionReducerMap } from "@ngrx/store";
// import { IState } from "../../common/entities/state";
// import { studentsReducer } from "./students.reducer";
// import { subjectsReducer } from "./subjects.reducer";

// export const reducers: ActionReducerMap<IState> = {
//   students: studentsReducer,
//   subjects: subjectsReducer
// };

const reducers: any = {
  subjects: subjectsReducer,
  students: studentsReducer
};

const reducer: ActionReducer<IState> = combineReducers(reducers);

export { reducer };
