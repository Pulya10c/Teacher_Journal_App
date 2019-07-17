import { ActionReducerMap } from "@ngrx/store";

import { IState } from "src/app/common/entities/state";
import { reducerStudent } from "./students.reducer";
import { reducerSubject } from "./subjects.reducer";

const reducer: ActionReducerMap<IState, any> = {
  studentsList: reducerStudent,
  subjectsList: reducerSubject
};

export { reducer };
