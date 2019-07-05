interface IMark {
  _id: string;
  mark: number;
}

interface IMarks {
  date: number;
  students: IMark[];
}

export interface ISubject {
  _id: string;
  index: number;
  nameSubject: string;
  teacher: string;
  cabinet: number;
  description: string;
  marks: IMarks[];
}
