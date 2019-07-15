import { IStudentStore } from "./students-store";
import { ISubjectStore } from "./subjects-store";

export interface IState {
  students: IStudentStore;
  subjects: ISubjectStore;
}
