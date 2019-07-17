import { IStudentState } from "./students-state";
import { ISubjectState } from "./subjects-state";

export interface IState {
  studentsList: IStudentState;
  subjectsList: ISubjectState;
}
