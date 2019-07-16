import { combineReducers, ActionReducer, ActionReducerMap } from "@ngrx/store";

import { IState } from "src/app/common/entities/state";
import { reducerStudent } from "./students.reducer";
import { reducerSubject } from "./subjects.reducer";

const reducers: ActionReducerMap<IState, any> = {
  studentList: reducerStudent,
  subjectsList: reducerSubject
};

const reducer: ActionReducer<IState> = combineReducers(reducers);

export { reducer };
