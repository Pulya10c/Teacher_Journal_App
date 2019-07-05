interface IMark {
  id: string;
  mark: number;
}

interface IMarks {
  date: number;
  students: IMark[];
}

export interface ISubject {
  id: string;
  index: number;
  nameSubject: string;
  teacher: string;
  cabinet: number;
  description: string;
  marks: IMarks[];
}
