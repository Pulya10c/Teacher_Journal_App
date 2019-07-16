import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { IState } from "../common/entities/state";
import { loadStudents } from "../store/actions/students.action";
import { loadSubjects } from "../store/actions/subjects.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private store: Store<IState>;

  constructor(store: Store<IState>) {
    this.store = store;
  }

  public ngOnInit(): void {
    // this.store.dispatch(new LoadStudents());
    // this.store.dispatch(new LoadSubjects());
  }
}
