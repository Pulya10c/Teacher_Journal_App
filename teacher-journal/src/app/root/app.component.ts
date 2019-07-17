import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { IState } from "../common/entities/state";
import { loadStudents, updateStudents } from "../store/actions/students.action";
import { loadSubjects, updateSubjects } from "../store/actions/subjects.action";
import { DataService } from "../common/services/data.service";
import { IStudent } from "../common/entities/student";
import { URL_DB, DB_STUDENTS, DB_SUBJECTS } from "../common/constants/data-constants";
import { ISubject } from "../common/entities/subject";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private store: Store<IState>;
  private dataService: DataService;

  constructor(store: Store<IState>, dataService: DataService) {
    this.store = store;
    this.dataService = dataService;
  }

  public ngOnInit(): void {
    this.store.dispatch(updateStudents());
    this.store.dispatch(updateSubjects());
    // this.dataService.getHttp<IStudent>(URL_DB, DB_STUDENTS).subscribe(data => {
    //   this.store.dispatch(loadStudents({ student: data }));
    // });

    // this.dataService.getHttp<ISubject>(URL_DB, DB_SUBJECTS).subscribe(data => {
    //   this.store.dispatch(loadSubjects({ subject: data }));
    // });
  }
}
