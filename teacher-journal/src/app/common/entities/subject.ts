interface IList {
  [propName: string]: string;
}

interface IMark {
  [propName: string]: IList;
}

export interface ISubject {
  _id: string;
  index: number;
  nameSubject: string;
  teacher: string;
  cabinet: number;
  description: string;
  marks: IMark;
}
