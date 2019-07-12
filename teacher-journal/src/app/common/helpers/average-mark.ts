import { ISubject } from "../entities/subject";

export default function getAverageMark({ marks }: ISubject, idStudent: string): number {

  let numberOfMarks: number = 0;
  if (!marks.length) {
    return 0;
  }

  let averageMark: number = marks.reduce(
    (summ: number, { students }: any) => {
      const findStudent: any = students
        .find(
          ({ id }: {id: string}) => id === idStudent
        );

      if (findStudent) {
        summ += findStudent.mark;
        numberOfMarks++;
      }
      return summ;
    },
    0
  );

  averageMark =
    Math.round(
      ((averageMark / numberOfMarks) * Math.pow(10, 21)) / Math.pow(10, 19)
    ) / 100;

  return averageMark ? averageMark : 0;
}
