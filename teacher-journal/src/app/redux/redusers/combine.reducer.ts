import { ActionReducerMap } from "@ngrx/store";

import { IState } from "src/app/common/entities/state";
import { reducerStudent } from "./students.reducer";
import { reducerSubject } from "./subjects.reducer";
import { reducerDropdown } from "./dropdown.reducer";

const reducer: ActionReducerMap<IState, any> = {
  studentsList: reducerStudent,
  subjectsList: reducerSubject,
  dropdownList: reducerDropdown
};

export { reducer };
