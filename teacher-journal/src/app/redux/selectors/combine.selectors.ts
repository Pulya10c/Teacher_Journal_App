import { createSelector, MemoizedSelector, Selector } from "@ngrx/store";

import { ISubjectState } from "src/app/common/entities/subjects-state";
import { IStudentState } from "src/app/common/entities/students-state";
import { IStudent } from "src/app/common/entities/student";
import { ISubject } from "src/app/common/entities/subject";
import { IState } from "src/app/common/entities/state";

const selectStudentList: Selector<IState, IStudentState> = (state: IState) => state.studentsList;
const selectSubjectList: Selector<IState, ISubjectState> = (state: IState) => state.subjectsList;

export const selectStudents: MemoizedSelector<IState, IStudent[]> = createSelector<IState, IStudentState, IStudent[]>(
  selectStudentList,
  (state: IStudentState) => state.students
);

export const selectSubjects: MemoizedSelector<IState, ISubject[]> = createSelector<IState, ISubjectState, ISubject[]>(
  selectSubjectList,
  (state: ISubjectState) => state.subjects
);
