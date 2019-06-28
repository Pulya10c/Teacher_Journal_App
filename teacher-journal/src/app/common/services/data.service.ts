import { Injectable } from "@angular/core";

import { data } from "../../../assets/mock-data";
import { IStudent } from "../entities/student";
import { ISubject } from "../entities/subject";
import * as createId from "uuid/v1";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public students: IStudent[];
  public subjects: ISubject[];

  constructor() {
    this.students = data.students;
    this.subjects = data.subjects;
  }

  public getStudents(): IStudent[] {
    return this.students;
  }

  public setStudents(students: IStudent[]): void {
    this.students = students;
  }

  public getSubjects(): ISubject[] {
    return this.subjects;
  }

  public setSubjects(subjects: ISubject[]): void {
    this.subjects = subjects;
  }

  public getKeysObject(object: any): string[] {
    return Object.keys(object);
  }

  public addNewStudent(newStudent: any): IStudent[] {
    if (newStudent.firstName) {
      this.students = [
        ...this.students,
        {
          _id: createId(),
          index: this.students.length,
          name: newStudent.firstName,
          lastName: newStudent.lastName,
          address: newStudent.address,
          about: newStudent.description
        }
      ];
    }
    return this.students;
  }
  public addNewSubject(newSubject: any): ISubject[] {
    if (newSubject.name) {
      this.subjects = [
        ...this.subjects,
        {
          _id: createId(),
          index: this.subjects.length,
          nameSubject: newSubject.name,
          teacher: newSubject.teacher,
          cabinet: newSubject.cabinet,
          description: newSubject.description,
          marks: {}
        }
      ];
    }
    return this.subjects;
  }
}
