import { Component, OnInit, NgModule } from "@angular/core";
import { DataService } from "../../../common/services/data.service";
import { ChangeService } from "../../../common/services/change.service";
import { ISubject } from "../../../common/entities/subject";
import { SharedModule } from "../../../shared/shared.module";
import { URL_DB_SUBJECTS } from "../../../common/constants/data-constants";
import {
  NotificationService,
  NotificationModel
} from "../../../common/services/notification.service";

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
  private isVisibleSubjectPage: boolean = false;
  private notificationService: NotificationService;

  constructor(
    dataService: DataService,
    changeService: ChangeService,
    notificationService: NotificationService
  ) {
    this.dataService = dataService;
    this.notificationService = notificationService;
    this.changeService = changeService;
  }

  private onViewSubjectList(event: Event): void {
    this.subjectName = (<HTMLButtonElement>event.target).innerText;
    this.isVisibleSubjectPage = true;
    this.subjects.forEach(subjectItem => {
      if (subjectItem.nameSubject === this.subjectName) {
        this.subject = subjectItem;
      }
    });
  }

  private showToast(
    header: string,
    description: string,
    success: boolean
  ): void {
    this.notificationService.showToast(
      new NotificationModel(header, description, success)
    );
  }

  private initForm(): void {
    this.dataService.getHttpSubjects(URL_DB_SUBJECTS).subscribe(data => {
      this.subjects = data;
    });
  }

  private onVisibleFormSubject(): void {
    this.isVisibleSubjectList = !this.isVisibleSubjectList;
  }

  private addSubject({
    visible,
    newSubject,
    isCreateSubject
  }: {
    visible: boolean;
    newSubject: ISubject;
    isCreateSubject: boolean;
  }): void {
    this.isVisibleSubjectList = visible;

    if (isCreateSubject) {
      const {
        subject,
        isAdd
      }: { subject: ISubject; isAdd: boolean } = this.changeService.addNewSubject(
        this.subjects,
        newSubject
      );

      if (isAdd) {
        this.dataService
          .postHttp(URL_DB_SUBJECTS, subject)
          .subscribe(response => {
            this.subjects = [...this.subjects, response];
            this.subject = response;
          });

        this.showToast(
          "Success",
          `Subject ${subject.nameSubject} successfully added!`,
          true
        );
      } else {
        this.showToast(
          "Warning",
          `Subject ${newSubject.nameSubject} already exists!`,
          false
        );
      }
    }
  }

  private isVisible(value: boolean): void {
    this.isVisibleSubjectPage = value;
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
