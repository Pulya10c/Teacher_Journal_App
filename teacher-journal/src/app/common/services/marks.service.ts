import { Injectable } from "@angular/core";
import { ISubject } from "../entities/subject";
import { DataService } from "./data.service";
import { IDateMarksList } from "../entities/date-marks-list";
import changeStudentMark from "../helpers/change-student-mark";

@Injectable()
export class MarksService {
  private getDataService: DataService;

  constructor(dataService: DataService) {
    this.getDataService = dataService;
  }

  public changeMark(
    dateMarksList: IDateMarksList[],
    date: number,
    studentId: string,
    newMark: number,
  ): IDateMarksList[] {

    dateMarksList.forEach(marksList => {
      if (marksList.date === date) {
        changeStudentMark(marksList.students, studentId, newMark);
      }
    });
    return [...dateMarksList];
  }
}
