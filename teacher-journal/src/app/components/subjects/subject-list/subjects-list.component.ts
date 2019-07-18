import { Component, OnInit, NgModule } from "@angular/core";

import { ISubject } from "../../../common/entities/subject";
import { SharedModule } from "../../../shared/shared.module";
import { select, Store } from "@ngrx/store";
import { selectSubjects } from "src/app/store/selectors/combine.selectors";
import { IState } from "src/app/common/entities/state";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects-list.component.html",
  styleUrls: ["./subjects-list.component.scss"]
})

@NgModule({
  imports: [SharedModule]
})

export class SubjectsListComponent implements OnInit {
  private subjects: ISubject[] = [];
  private store: Store<IState>;

  constructor(store: Store<IState>) {
    this.store = store;
  }

  private initForm(): void {
    this.store.pipe(select(selectSubjects)).subscribe(data => {
      if (data.length) {
        this.subjects = data;
        this.subjects.sort(
          (prev, next) => prev.nameSubject > next.nameSubject ? 1 : -1
        );
      }
    });
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
