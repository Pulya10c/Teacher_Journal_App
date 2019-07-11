import { Component, OnInit, NgModule } from "@angular/core";
import {
  NotificationService,
  NotificationModel
} from "../../../common/services/notification.service";
import { DataService } from "../../../common/services/data.service";
import { ISubject, IMarks } from "../../../common/entities/subject";
import { IStudent } from "../../../common/entities/student";
import { SharedModule } from "../../../shared/shared.module";
import { ChangeService } from "../../../common/services/change.service";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HEDER_NAME_SUBJECT_PAGE } from "../../../common/constants/subject-constants";
import sortDate from "../../../common/helpers/sort-date";
import getAverageMark from "../../../common/helpers/average-mark";
import {
  DB_STUDENTS,
  URL_DB_SUBJECTS,
  URL_DB,
  DB_SUBJECTS
} from "../../../common/constants/data-constants";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IComponentCanDeactivate } from "src/app/common/entities/component-can-deactivate";
import runModalDialog from "src/app/common/helpers/modal-form-guard";

@Component({
  selector: "app-subject-page",
  templateUrl: "./subject-page.component.html",
  styleUrls: ["./subject-page.component.scss"]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class SubjectPageComponent implements OnInit, IComponentCanDeactivate {
  private dataService: DataService;
  private students: IStudent[] = [];
  private subjectCopy: ISubject;
  private headerNameStudents: string[] = HEDER_NAME_SUBJECT_PAGE;
  private changeService: ChangeService;
  private notificationService: NotificationService;
  private dateClick: number;
  private isChangesMade: boolean = true;
  private isMarksCorrect: boolean = true;
  private router: Router;
  private subjectName: string;
  private subjects: ISubject[] = [];
  private subject: ISubject = {
    id: "",
    index: 0,
    nameSubject: "",
    teacher: "",
    cabinet: 0,
    description: "",
    marks: []
  };

  constructor(
    dataService: DataService,
    changeService: ChangeService,
    notificationService: NotificationService,
    router: Router
  ) {
    this.dataService = dataService;
    this.changeService = changeService;
    this.notificationService = notificationService;
    this.router = router;
  }
  private initForm(): void {
    this.subjectName = this.router.url.split("/").pop();

    this.dataService.getHttp<IStudent>(URL_DB, DB_STUDENTS).subscribe(data => {
      this.students = data;
    });

    this.dataService.getHttp<ISubject>(URL_DB, DB_SUBJECTS).subscribe(data => {
      this.subjects = data;
      this.subject = this.subjects.find(
        subject => subject.nameSubject === this.subjectName
      );
      this.subject.marks.sort(sortDate);
      this.subjectCopy = JSON.parse(JSON.stringify(this.subject));
    });

    this.subjectCopy = JSON.parse(JSON.stringify(this.subject));
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

  private calculationAverageMark(idStudent: string): number {
    return getAverageMark(this.subject, idStudent);
  }

  private findStudentMark(
    marks: { id: string; mark: number }[],
    idStudent: string
  ): any {
    const markStudent: { id: string; mark: number } = marks.find(
      ({ id }: { id: String }) => id === idStudent
    );
    return markStudent ? markStudent.mark : undefined;
  }

  private onAddDate(date: Date): void {
    this.isChangesMade = false;
    const thisDate: number = new Date(date).getTime();
    const isThisDate: boolean = !!this.subject.marks.find(
      (listMarks: IMarks) => listMarks.date === thisDate
    );

    if (!isThisDate) {
      const createNewDate: { date: number; students: undefined[] } = {
        date: thisDate,
        students: []
      };
      this.subject.marks.push(createNewDate);
      this.subject.marks.sort(sortDate);
      this.showToast("Success", `Date ${date} successfully added!`, true);
    } else {
      this.showToast("Warning", `Date ${date} already exists!`, false);
    }
  }

  private onChangeDate(changeData: Date): void {
    this.isChangesMade = false;
    this.subjectCopy = JSON.parse(JSON.stringify(this.subject));
    const dateCheck: number = changeData.getTime();
    this.subject.marks.forEach(dateMarksList => {
      if (dateMarksList.date === this.dateClick) {
        dateMarksList.date = dateCheck;
      }
    });
  }

  private onSave(): void {
    this.showToast("Success", "Changes saved!", true);
    const id: string = this.subject.id;
    this.dataService
      .putHttp(URL_DB_SUBJECTS, this.subject)
      .subscribe(
        (response: ISubject) => (this.subjectCopy.marks = response.marks)
      );
    this.isChangesMade = true;
  }

  private onCancel(): void {
    this.router.navigate(["subject"]);
  }

  private onClickInput(date: Date): void {
    this.dateClick = +date;
  }

  private modelChanged(newMark: number, date: number, studentId: string): void {
    this.subject.marks = this.changeService.changeMark(
      this.subject.marks,
      date,
      studentId,
      newMark
    );
    this.isMarksCorrect = !!this.subject.marks.find(
      ({ students }) =>
        !!students.find(mark => mark.mark <= 0 || mark.mark > 10)
    );
    this.isChangesMade = false;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public canDeactivate(): boolean | Observable<boolean> {
    console.log(this.isChangesMade, this.isMarksCorrect);
    if (!this.isChangesMade && !this.isMarksCorrect) {
      return runModalDialog(
        "You have saved any changes.",
        "If you leaving the page all changes will be lost. Are you leaving this page?"
      );
    } else {
      return true;
    }
  }
}
