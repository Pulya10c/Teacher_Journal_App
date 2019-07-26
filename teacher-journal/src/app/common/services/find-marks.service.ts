import { Injectable } from "@angular/core";
import { ISubject, IMarks } from "../entities/subject";

@Injectable({
  providedIn: "root"
})
export class FindMarksService {
  public getMarks(studentsId: string, subjects: ISubject[], subjectsList: { subject: string; datesCheckedSource: number[] }[]): any {
    const studentMarksOfSubjectForDate: Function = (id: string, datesChecked: number[], marks: IMarks[]): number[] => {
      let listMarksStudentForSelectDates: number[] = [];
      datesChecked.forEach(dateFromSourceList => {
        marks.forEach(({ date, students }: IMarks) => {
          if (dateFromSourceList === date) {
            listMarksStudentForSelectDates = [
              ...listMarksStudentForSelectDates,
              students.reduce(
                (acc, item) => {

                  return item.id === id ? item.mark : acc;
                },
                0)
            ];
          }
        });
      });
      return listMarksStudentForSelectDates.filter((item: number) => item);
    };

    return subjectsList.map(({ subject, datesCheckedSource }: { subject: string; datesCheckedSource: number[] }) => {
      return subjects
        .filter(
          ({ nameSubject }: ISubject) => nameSubject === subject
        )
        .map(
          ({ nameSubject, marks }: ISubject) => {
          return {
            nameSubject,
            marksList: studentMarksOfSubjectForDate(studentsId, datesCheckedSource, marks)
          };
        })[0];
    });
  }
}
