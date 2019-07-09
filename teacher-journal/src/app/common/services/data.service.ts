import { Injectable } from "@angular/core";
import { ISubject } from "../entities/subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  public getHttp<T>(URL: string, name: string): Observable<T[]> {
    return this.http.get<T[]>(URL + `/${name}`).pipe(
      map((response: T[] ) => {
        return response;
      }),
      catchError((err: Observable<any>) => {
        console.log("data loading error", err);
        return of([]);
      })
    );
  }

  public postHttp<T>(URL: string, addItem: T): Observable<T> {
    return this.http.post<T>(URL, addItem, this.httpOptions).pipe(
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
          return response;
        })
      );
  }
}
