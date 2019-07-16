import { IStudentState } from "./students-state";
import { ISubjectState } from "./subjects-state";

export interface IState {
  studentList: IStudentState;
  subjectsList: ISubjectState;
}
