interface IMark {
  id: string;
  mark: number;
}

interface IMarks {
  date: number;
  students: IMark[];
}

interface ISubject {
  id: string;
  index: number;
  nameSubject: string;
  teacher: string;
  cabinet: number;
  description: string;
  marks: IMarks[];
}

export {ISubject, IMarks, IMark};
