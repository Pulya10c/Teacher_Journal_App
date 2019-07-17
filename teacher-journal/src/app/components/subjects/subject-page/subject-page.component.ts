import { Component, OnInit, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { HEDER_NAME_SUBJECT_PAGE } from "../../../common/constants/subject-constants";
import { URL_DB_SUBJECTS } from "../../../common/constants/data-constants";

import runModalDialog from "src/app/common/helpers/modal-form-guard";
import getAverageMark from "../../../common/helpers/average-mark";
import sortDate from "../../../common/helpers/sort-date";

import { NotificationService, NotificationModel } from "../../../common/services/notification.service";
import { selectSubjects, selectStudents } from "src/app/store/selectors/combine.selectors";
import { IComponentCanDeactivate } from "src/app/common/entities/component-can-deactivate";
import { marksToChangeSubject, initMarksToChangeSubject } from "src/app/store/actions/subjects.action";
import { ISubject, IMarks } from "../../../common/entities/subject";
import { ChangeService } from "../../../common/services/change.service";
import { SharedModule } from "../../../shared/shared.module";
import { DataService } from "../../../common/services/data.service";
import { IStudent } from "../../../common/entities/student";
import { IState } from "src/app/common/entities/state";

@Component({
  selector: "app-subject-page",
  templateUrl: "./subject-page.component.html",
  styleUrls: ["./subject-page.component.scss"]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class SubjectPageComponent implements OnInit, IComponentCanDeactivate {
  private store: Store<IState>;
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
    store: Store<IState>,
    dataService: DataService,
    changeService: ChangeService,
    notificationService: NotificationService,
    router: Router
  ) {
    this.store = store;
    this.dataService = dataService;
    this.changeService = changeService;
    this.notificationService = notificationService;
    this.router = router;
  }

  private initForm(): void {
    this.subjectName = this.router.url.split("/").pop();

    this.store.pipe(
      select(selectStudents)
    ).subscribe(
      data => {
        if (data.length !== 0) {
          this.students = data;
        }
      }
    );

    this.store.pipe(
      select(selectSubjects)
    )
    .subscribe(data => {
      if (!!data.length) {
        this.subjects = data;
        this.subject = this.subjects.find(subject => subject.nameSubject === this.subjectName);
        this.subject.marks.sort(sortDate);
        this.subjectCopy = JSON.parse(JSON.stringify(this.subject));
      }
    });

    this.subjectCopy = JSON.parse(JSON.stringify(this.subject));
  }

  private showToast(header: string, description: string, success: boolean): void {
    this.notificationService.showToast(new NotificationModel(header, description, success));
  }

  private calculationAverageMark(idStudent: string): number {
    return getAverageMark(this.subject, idStudent);
  }

  private findStudentMark(marks: { id: string; mark: number }[], idStudent: string): number | undefined {
    const markStudent: { id: string; mark: number } = marks.find(
      ({ id }: { id: String }) => id === idStudent
    );

    return markStudent ? markStudent.mark : undefined;
  }

  private onAddDate(date: Date): void {
    this.isChangesMade = false;
    const thisDate: number = new Date(date).getTime();
    const isThisDate: boolean = !!this.subject.marks.find((listMarks: IMarks) => listMarks.date === thisDate);

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
    this.store.dispatch(
      initMarksToChangeSubject({ subject: this.subject })
    );
    // this.dataService
    // .putHttp(URL_DB_SUBJECTS, this.subject)
    // .subscribe(
    //   (response: ISubject) => {
    //     this.showToast("Success", `Changes in ${response.nameSubject} saved!`, true);
    //     return this.store.dispatch(
    //     marksToChangeSubject({ subject: response })
    //     );
    //   }
    // );
    this.isChangesMade = true;
  }

  private onCancel(): void {
    this.router.navigate(["subject"]);
  }

  private onClickInput(date: Date): void {
    this.dateClick = +date;
  }

  private modelChanged(newMark: number, date: number, studentId: string): void {
    if (!!studentId) {
      this.subject.marks = this.changeService.changeMark(this.subject.marks, date, studentId, newMark);
      this.isMarksCorrect = !!this.subject.marks.find(({ students }) => !!students.find(mark => mark.mark <= 0 || mark.mark > 10));
    }
    this.isMarksCorrect = false;
    this.isChangesMade = false;

  }

  public ngOnInit(): void {
    this.initForm();
  }

  public canDeactivate(): boolean | Observable<boolean> {
    if (!this.isChangesMade && !this.isMarksCorrect) {
      return runModalDialog("You have saved any changes.", "If you leaving the page all changes will be lost. Are you leaving this page?");
    } else {
      return true;
    }
  }
}
