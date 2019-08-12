import { createSelector, MemoizedSelector, Selector } from "@ngrx/store";

import { ISubjectState } from "src/app/common/entities/subjects-state";
import { IStudentState } from "src/app/common/entities/students-state";
import { IStudent } from "src/app/common/entities/student";
import { ISubject } from "src/app/common/entities/subject";
import { IState } from "src/app/common/entities/state";
import { IDropdownState } from "src/app/common/entities/dropdown-state";
import { IDropdown } from "src/app/common/entities/dropdown";

const selectStudentList: Selector<IState, IStudentState> = (state: IState) => state.studentsList;
const selectSubjectList: Selector<IState, ISubjectState> = (state: IState) => state.subjectsList;
const selectDropdownList: Selector<IState, IDropdownState> = (state: IState) => state.dropdownList;

export const selectStudents: MemoizedSelector<IState, IStudent[]> = createSelector<IState, IStudentState, IStudent[]>(
  selectStudentList,
  (state: IStudentState) => state.students
);

export const selectSubjects: MemoizedSelector<IState, ISubject[]> = createSelector<IState, ISubjectState, ISubject[]>(
  selectSubjectList,
  (state: ISubjectState) => state.subjects
);

export const selectDropdown: MemoizedSelector<IState, IDropdown[]> = createSelector<IState, IDropdownState, IDropdown[]>(
  selectDropdownList,
  (state: IDropdownState) => state.dropdown
);
