import { Injectable } from "@angular/core";

import { data } from "../../../assets/mock-data";
import { IStudent } from "../entities/student";
import { ISubject } from "../entities/subject";
import * as createId from "uuid/v1";
import { URL_DB_STUDENTS, URL_DB_SUBJECTS } from "../constants/data-constants";

@Injectable({
  providedIn: "root"
})
export class DataService {

  public getStudents(): IStudent[] {
    return data.students;
  }

  public getSubjects(): ISubject[] {
    return data.subjects;
  }

  public addNewStudent(students: IStudent[], newStudent: any): IStudent[] {
    if (newStudent.firstName) {
      students = [
        ...students,
        {
          _id: createId(),
          index: students.length,
          name: newStudent.firstName,
          lastName: newStudent.lastName,
          address: newStudent.address,
          about: newStudent.description
        }
      ];
    }
    return students;
  }

  public addNewSubject(subjects: ISubject[], newSubject: ISubject): ISubject[] {

    const isAddNewSubject: boolean = !subjects.find(
      (subject: ISubject) => subject.nameSubject === newSubject.nameSubject
    );

    if (newSubject.nameSubject && isAddNewSubject) {
      subjects = [
        ...subjects,
        {
          _id: createId(),
          index: subjects.length,
          nameSubject: newSubject.nameSubject,
          teacher: newSubject.teacher,
          cabinet: newSubject.cabinet,
          description: newSubject.description,
          marks: []
        }
      ];

      return subjects;
    }

    if (newSubject.nameSubject && !isAddNewSubject) {

      const index: number = subjects.findIndex(el => el.nameSubject === newSubject.nameSubject);

      subjects[index] = {
          _id: newSubject._id,
          index: subjects.length,
          nameSubject: newSubject.nameSubject,
          teacher: newSubject.teacher,
          cabinet: newSubject.cabinet,
          description: newSubject.description,
          marks: newSubject.marks
        };
    }
    return subjects;
  }
}
