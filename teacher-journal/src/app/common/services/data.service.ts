import { Injectable } from "@angular/core";

import  { data } from "../../../assets/mock-data";
import { IStudent } from "../entities/student";
import { ISubject } from "../entities/subject";

@Injectable({
  providedIn: "root"
})

export class DataService {
  // constructor() {}

  public getStudents(): IStudent[] {
    return data.students;
  }

  public getSubjects(): ISubject[] {
    return data.subjects;
  }

  public getKeysObject(object: any): string[] {
    return Object.keys(object);
  }

}
