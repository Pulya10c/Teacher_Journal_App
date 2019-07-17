import { Component, OnInit, NgModule } from "@angular/core";

import { DB_SUBJECTS, URL_DB } from "../../../common/constants/data-constants";

import { DataService } from "../../../common/services/data.service";
import { ChangeService } from "../../../common/services/change.service";
import { NotificationService, NotificationModel } from "../../../common/services/notification.service";
import { ISubject } from "../../../common/entities/subject";
import { SharedModule } from "../../../shared/shared.module";
import { select, Store, ScannedActionsSubject } from "@ngrx/store";
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
  private dataService: DataService;
  private changeService: ChangeService;
  private subjectName: string;
  private isVisibleSubjectList: boolean = true;
  private subject: ISubject;
  private notificationService: NotificationService;
  private store: Store<IState>;

  constructor(dataService: DataService, changeService: ChangeService, notificationService: NotificationService, store: Store<IState>) {
    this.dataService = dataService;
    this.notificationService = notificationService;
    this.changeService = changeService;
    this.store = store;
  }

  private onViewSubjectList(event: Event): void {
    this.subjectName = (<HTMLButtonElement>event.target).innerText;
    this.subjects.forEach(subjectItem => {
      if (subjectItem.nameSubject === this.subjectName) {
        this.subject = subjectItem;
      }
    });
  }

  private showToast(header: string, description: string, success: boolean): void {
    this.notificationService.showToast(new NotificationModel(header, description, success));
  }

  private initForm(): void {
    this.store.pipe(select(selectSubjects)).subscribe(data => {
      if (data.length !== 0) {
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
