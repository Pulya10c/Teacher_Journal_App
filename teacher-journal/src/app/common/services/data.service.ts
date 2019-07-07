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

  public getHttpStudents(URL: string): Observable<IStudent[]> {
    return this.http
      .get<IStudent[]>(URL)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err: Observable<any>) => {
          console.log("data loading error", err);
          return of([]);
        })
      );
  }

  public getHttpSubjects(URL: string): Observable<ISubject[]> {
    return this.http
      .get<ISubject[]>(URL)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err: Observable<any>) => {
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

  public addNewStudent(
    index: number,
    { name, lastName, address, about }: any
  ): IStudent {
    const student: IStudent = {
      id: createId(),
      index,
      name,
      lastName,
      address,
      about
    };
    return student;
  }

  public addNewSubject(
    subjects: ISubject[],
    newSubject: ISubject
  ): ISubject {
    const isAddNewSubject: boolean = !!!subjects.find(
      (item: ISubject) => item.nameSubject === newSubject.nameSubject
    );
    let subject: ISubject;
    if (newSubject.nameSubject && isAddNewSubject) {

      subject = {
        id: createId(),
        index: subjects.length,
        nameSubject: newSubject.nameSubject,
        teacher: newSubject.teacher,
        cabinet: newSubject.cabinet,
        description: newSubject.description,
        marks: [{
          date: undefined,
          students: [
            {
              id: undefined,
              mark: undefined
            }]
        }]
      };

      return subject;
    }
  }

  public changeSubject(
    subjects: ISubject[],
    { id, nameSubject, teacher, cabinet, description, marks }: ISubject
  ): ISubject[] {
    const isAddNewSubject: boolean = !!!subjects.find(
      (item: ISubject) => item.nameSubject === nameSubject
    );

    if (nameSubject && !isAddNewSubject) {
      const index: number = subjects.findIndex(
        item => item.nameSubject === nameSubject
      );

      subjects[index] = {
        id,
        index,
        nameSubject,
        teacher,
        cabinet,
        description,
        marks
      };
    }
    return subjects;
  }
}
