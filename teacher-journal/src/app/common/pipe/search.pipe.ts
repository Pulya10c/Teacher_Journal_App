import { Pipe, PipeTransform } from "@angular/core";

import { IStudent } from "../entities/student";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  public transform(students: IStudent[], searchStudent: string): IStudent[] {
    const empty: IStudent[] = [
      {
        lastName: undefined,
        name: undefined,
        address: undefined,
        about: undefined,
        id: undefined,
        index: -1
      }
    ];
    if (students.length === 0) {
      return empty;
    }
    const resultFilter: IStudent[] = students.filter(
      (student: IStudent) =>
        student.lastName.toLowerCase().indexOf(searchStudent.toLowerCase())
        !== -1 ||
        student.name.toLowerCase().indexOf(searchStudent.toLowerCase())
        !== -1 ||
        student.address.toLowerCase().indexOf(searchStudent.toLowerCase())
        !== -1 ||
        student.about.toLowerCase().indexOf(searchStudent.toLowerCase())
        !== -1
    );
    return resultFilter.length ? resultFilter : empty;
  }
}
