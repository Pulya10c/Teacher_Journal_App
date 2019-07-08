import { Injectable } from "@angular/core";
import { IDateMarksList } from "../entities/date-marks-list";
import changeStudentMark from "../helpers/change-student-mark";

@Injectable()
export class MarksService {

  public changeMark(
    marksList: IDateMarksList[],
    date: number,
    studentId: string,
    newMark: number,
  ): IDateMarksList[] {

    marksList.forEach(marks => {
      if (marks.date === date) {
        changeStudentMark(marks.students, studentId, newMark);
      }
    });
    return [...marksList];
  }
}
