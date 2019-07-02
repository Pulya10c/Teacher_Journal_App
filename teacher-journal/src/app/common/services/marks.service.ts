import { Injectable } from "@angular/core";
import { IStudent } from "../entities/student";
import { ISubject } from "../entities/subject";
import { DataService } from "./data.service";
import { IResultTableSubject } from "../entities/resultsTableSubject";

@Injectable()
export class MarksService {
  private getDataService: DataService;

  constructor(dataService: DataService) {
    this.getDataService = dataService;
  }

  public getMarks(nameSubject: string): IResultTableSubject[] {
    return this.getDataService.getStudents().map(student => {
      const subject: ISubject = this.getDataService
        .getSubjects()
        .filter(subjectName => subjectName.nameSubject === nameSubject)[0];

      return {
        _id: student._id,
        name: student.name,
        lastName: student.lastName,
        marks: Object.keys(subject.marks).sort().map((day: string) =>
          +subject.marks[day][student._id]
            ? +subject.marks[day][student._id]
            : undefined
        ),
        averageMark: Object.keys(subject.marks).length
          ? +Object.keys(subject.marks).sort()
              .map((day: string) =>
                +subject.marks[day][student._id]
                  ? +subject.marks[day][student._id]
                  : 0
              )
              .filter((item: number) => item)
              .reduce(
                (average: number, mark: number, idx: number, array: number[]) =>
                  +mark / array.length + average,
                0
              )
              .toFixed(2)
          : 0
      };
    });
  }

  public updateChanges(
    event: string,
    idxStudent: number,
    idxMarks: number,
    change: boolean,
    resultsTableSubject: IResultTableSubject[],
    headerNameDate: string[],
    subject: ISubject
  ): { subject: ISubject; date: string } {
    let date: any;
    if (!change) {
      subject.marks[headerNameDate[idxMarks]][
        resultsTableSubject[idxStudent]._id
      ] = event;
    } else {
      date = event.match(
        /^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{2}$/
      );
      if (date && event.length === 8) {
        subject.marks[date[0]] = subject.marks[headerNameDate[idxMarks]];
        delete subject.marks[headerNameDate[idxMarks]];
      }
    }
    return { subject, date };
  }
}
