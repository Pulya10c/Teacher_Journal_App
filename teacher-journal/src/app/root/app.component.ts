import {
  Component,
  OnInit,
} from "@angular/core";

import { Store } from "@ngrx/store";

import { IState } from "../common/entities/state";
import { updateStudents } from "../redux/actions/students.action";
import { updateSubjects } from "../redux/actions/subjects.action";
import { setDropdownListDate } from "../redux/actions/dropdown.action";

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
    localStorage.removeItem("Jurnal_App_access");
    this.store.dispatch(updateStudents());
    this.store.dispatch(updateSubjects());
    this.store.dispatch(setDropdownListDate({ dropdownList: [] }));
  }
}
