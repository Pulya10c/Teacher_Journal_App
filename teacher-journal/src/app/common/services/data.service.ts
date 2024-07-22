import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { HTTP_HEADERS } from "../constants/data-constants";
import { ISubject } from "../entities/subject";

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

  public getNamePanel(url: string): Observable<string[]> {
    return this.http
    .get<{name: string[]}>(url)
    .pipe(
      map(
        ( response: {name: string[]} ) => {
          return response.name;
        }
      ),
      catchError(
        (err: Observable<any>) => {
          console.log("data loading error", err);
          return of([]);
        }
      )
    );
  }

  public getHttp<T>(URL: string, name: string): Observable<T[]> {
    return this.http
    .get<T[]>(URL + `/${name}`)
    .pipe(
      catchError(
        (err: Observable<any>) => {
          console.log("data loading error", err);
          return of([]);
        }
      )
    );
  }

  public postHttp<T>(URL: string, addItem: T): Observable<T> {
    return this.http
      .post<T>(URL, addItem, {
        headers: new HttpHeaders(HTTP_HEADERS)
      })
      .pipe(
        map(
          (response: T) => {
            return response;
          }
        )
      );
  }

  public putHttp(URL: string, subject: ISubject): Observable<ISubject> {
    return this.http
      .put<ISubject>(URL + `/${subject.id}`, subject, this.httpOptions)
      .pipe(
        map(
          (response: any) => {
            return response;
          }
        )
      );
  }
}
