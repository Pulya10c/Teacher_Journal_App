import { ISubject } from "./subject";
import { IStudent } from "./student";

export interface IData {
  students: IStudent[];
  subjects: ISubject[];
}
