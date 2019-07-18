import { Injectable } from "@angular/core";

import * as createId from "uuid/v1";

import { IStudent } from "../entities/student";
import { ISubject } from "../entities/subject";
import { IDateMarksList } from "../entities/date-marks-list";
import changeStudentMark from "../helpers/change-student-mark";

@Injectable({
  providedIn: "root"
})

export class ChangeService {
  public changeMark(
    marksList: IDateMarksList[],
    date: number,
    studentId: string,
    newMark: number,
  ): IDateMarksList[] {

    marksList
    .forEach(marks => {
      if (marks.date === date) {
        changeStudentMark(marks.students, studentId, newMark);
      }
    });

    return [...marksList];
  }

  public addNewStudent(
    index: number,
    { name, lastName, address, about }: any
  ): IStudent {
    const student: IStudent = {
      id: createId(),
      index,
      name,
      lastName,
      address,
      about
    };

    return student;
  }

  public addNewSubject(
    subjects: ISubject[],
    { nameSubject, teacher, cabinet, description }: ISubject
  ): {
    subject: ISubject;
    isAdd: boolean;
  } {
    const isAddNewSubject: boolean = !!!subjects.find(
      (itemSubject: ISubject) => itemSubject.nameSubject === nameSubject
    );

    let subject: ISubject;
    if (nameSubject && isAddNewSubject) {
      subject = {
        id: createId(),
        index: subjects.length,
        nameSubject,
        teacher,
        cabinet,
        description,
        marks: []
      };

      return {
        subject,
        isAdd: true
      };
    } else {
      subject = {
        id: "",
        index: 0,
        nameSubject: "",
        teacher: "",
        cabinet: 0,
        description: "",
        marks: []
      };

      return {
        subject,
        isAdd: false
      };
    }
  }
}
