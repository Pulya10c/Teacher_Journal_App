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
    return this.http.get<IStudent[]>(URL).pipe(
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
    return this.http.get<ISubject[]>(URL).pipe(
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

  public putHttp(URL: string, subject: ISubject): Observable<ISubject> {
    return this.http
      .put<ISubject>(URL + `/${subject.id}`, subject, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log(typeof response);
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
    { nameSubject, teacher, cabinet, description }: ISubject
  ): { subject: ISubject; isAdd: boolean } {
    const isAddNewSubject: boolean = !!!subjects.find(
      (itemSubject: ISubject) => itemSubject.nameSubject === nameSubject
    );

    let subject: ISubject;
    if (nameSubject && isAddNewSubject) {
      subject = {
        id: createId(),
        index: subjects.length,
        nameSubject,
        teacher,
        cabinet,
        description,
        marks: []
      };

      return { subject, isAdd: true };
    } else {
      subject = {
        id: "",
        index: 0,
        nameSubject: "",
        teacher: "",
        cabinet: 0,
        description: "",
        marks: []
      };

      return { subject, isAdd: false };
    }
  }
}
