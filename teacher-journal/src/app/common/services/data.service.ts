import { Injectable } from "@angular/core";
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
      map((response: IStudent[]) => {
        console.log(response);
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
      map((response: ISubject[]) => {
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
          console.log(response);
          return response;
        })
      );
  }
}
