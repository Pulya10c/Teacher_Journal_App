import { Component, OnInit, NgModule } from "@angular/core";
import { DataService } from "../../../common/services/data.service";
import { ISubject } from "../../../common/entities/subject";
import { SharedModule } from "../../../shared/shared.module";
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
  private subjects: ISubject[];
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
    this.subjects = this.getDataService.getSubjects();
  }

  private onVisibleFormSubject(): void {
    this.isVisibleSubjectList = !this.isVisibleSubjectList;
    
  }

  private addSubject(value: { visible: boolean; newSubject: ISubject }): void {
    this.isVisibleSubjectList = value.visible;
    if (
      this.subjects.find(
        (subject: ISubject) =>
          subject.nameSubject === value.newSubject.nameSubject
      )
    ) {
      this.showToast(
        "Warning",
        `Subject ${value.newSubject.nameSubject} already exists!`,
        false
      );
    } else {
      if (value.newSubject.nameSubject) {
        this.subjects = this.getDataService.addNewSubject(value.newSubject);
        this.showToast(
          "Success",
          `Subject ${value.newSubject.nameSubject} successfully added!`,
          true
        );
      }
    }
    this.initForm();
  }

  private isVisible(value: boolean): void {
    this.isVisibleSubjectPage = value;
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
