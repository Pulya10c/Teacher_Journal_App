import { Injectable } from "@angular/core";

import { data } from "../../../assets/mock-data";
import { IStudent } from "../entities/student";
import { ISubject } from "../entities/subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as createId from "uuid/v1";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HTTP_HEADERS } from "../constants/data-constants";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private http: HttpClient;
  private httpOptions: any = {
    headers: new HttpHeaders(HTTP_HEADERS)
  };

  private constructor(http: HttpClient) {
    this.http = http;
  }

  // public getStudents(): IStudent[] {
  //   return data.students;
  // }

  public getHttp(URL: string): Observable<any> {
    return this.http
      .get<any>(URL)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .pipe(
        catchError(err => {
          console.log("data loading error", err);
          return of([]);
        })
      );
  }

  public postHttp(URL: string, addItem: any): Observable<any> {
    return this.http.post<any>(URL, addItem, this.httpOptions).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // public getSubjects(): ISubject[] {
  //   return data.subjects;
  // }

  public addNewStudent(
    index: number,
    { firstName, lastName, address, description }: any
  ): IStudent {
    const student: IStudent = {
      id: createId(),
      index,
      name: firstName,
      lastName,
      address,
      about: description
    };
    return student;
  }

  public addNewSubject(subjects: ISubject[], newSubject: ISubject): ISubject[] {
    const isAddNewSubject: boolean = !subjects.find(
      (subject: ISubject) => subject.nameSubject === newSubject.nameSubject
    );

    if (newSubject.nameSubject && isAddNewSubject) {
      subjects = [
        ...subjects,
        {
          id: createId(),
          index: subjects.length,
          nameSubject: newSubject.nameSubject,
          teacher: newSubject.teacher,
          cabinet: newSubject.cabinet,
          description: newSubject.description,
          marks: []
        }
      ];

      return subjects;
    }

    if (newSubject.nameSubject && !isAddNewSubject) {
      const index: number = subjects.findIndex(
        el => el.nameSubject === newSubject.nameSubject
      );

      subjects[index] = {
        id: newSubject.id,
        index: subjects.length,
        nameSubject: newSubject.nameSubject,
        teacher: newSubject.teacher,
        cabinet: newSubject.cabinet,
        description: newSubject.description,
        marks: newSubject.marks
      };
    }
    return subjects;
  }
}
