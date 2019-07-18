import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";

import { IState } from "../common/entities/state";
import { updateStudents } from "../store/actions/students.action";
import { updateSubjects } from "../store/actions/subjects.action";

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
    this.store.dispatch(updateStudents());
    this.store.dispatch(updateSubjects());
  }
}
