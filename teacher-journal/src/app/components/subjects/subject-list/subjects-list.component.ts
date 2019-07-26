import { Component, OnInit, NgModule } from "@angular/core";

import { select, Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { SharedModule } from "../../../shared/shared.module";
import { selectSubjects } from "src/app/redux/selectors/combine.selectors";
import { ISubject } from "../../../common/entities/subject";
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
  private componentDestroyed: Subject<any> = new Subject();

  constructor(store: Store<IState>) {
    this.store = store;
  }

  private initForm(): void {
    this.store.pipe(
      select(selectSubjects),
      takeUntil(this.componentDestroyed)
    ).subscribe(data => {
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

  public ngOnDestroy (): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
