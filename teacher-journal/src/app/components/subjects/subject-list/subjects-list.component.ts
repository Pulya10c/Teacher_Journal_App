import { Component, OnInit, NgModule } from "@angular/core";
import { DataService } from "../../../common/services/data.service";
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
  private getDataService: DataService;
  private subjectName: string;
  private isVisibleSubjectList: boolean = true;
  private subject: ISubject;
  private isVisibleSubjectPage: boolean = false;
  private notificationService: NotificationService;

  constructor(
    dataService: DataService,
    notificationService: NotificationService
  ) {
    this.getDataService = dataService;
    this.notificationService = notificationService;
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
    this.getDataService.getHttpSubjects(URL_DB_SUBJECTS).subscribe(data => {
      this.subjects = data;
    });
  }

  private onVisibleFormSubject(): void {
    this.isVisibleSubjectList = !this.isVisibleSubjectList;
  }

  private addSubject(
    { visible, newSubject, isAdd }:
      { visible: boolean; newSubject: ISubject; isAdd: boolean }
  ): void {
    this.isVisibleSubjectList = visible;

    const isCreateSubject: boolean = !!this.subjects.find(
      (subject: ISubject) =>
        subject.nameSubject === newSubject.nameSubject
    );
    if (isCreateSubject) {
      this.showToast(
        "Warning",
        `Subject ${newSubject.nameSubject} already exists!`,
        false
      );
    } else {
      if (isAdd) {
        const subject: ISubject = this.getDataService.addNewSubject(this.subjects, newSubject);

        this.getDataService
          .postHttp(URL_DB_SUBJECTS, subject)
          .subscribe(response => {
            // this.subjects = [...this.subjects, response];
            console.log(response);
            this.subjects = [...this.subjects, subject];
          });

        // this.subjects = this.getDataService.addNewSubject(this.subjects, newSubject);

        this.showToast(
          "Success",
          `Subject ${newSubject.nameSubject} successfully added!`,
          true
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
