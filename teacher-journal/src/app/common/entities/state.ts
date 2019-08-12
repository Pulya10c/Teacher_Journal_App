import { IStudentState } from "./students-state";
import { ISubjectState } from "./subjects-state";
import { IDropdownState } from "./dropdown-state";

export interface IState {
  studentsList: IStudentState;
  subjectsList: ISubjectState;
  dropdownList: IDropdownState;
}
