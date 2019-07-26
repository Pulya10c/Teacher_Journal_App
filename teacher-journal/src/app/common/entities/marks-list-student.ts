export interface IMarksListStudent {
  id: string;
  subjects: {
    nameSubject: string;
    marks: number[];
  };
}
