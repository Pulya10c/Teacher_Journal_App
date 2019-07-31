import { Component, OnInit, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { HEDER_NAME_SUBJECT_PAGE } from "../../../common/constants/subject-constants";

import runModalDialog from "src/app/common/helpers/modal-form-guard";
import getAverageMark from "../../../common/helpers/average-mark";
import sortDate from "../../../common/helpers/sort-date";

import { NotificationService, NotificationModel } from "../../../common/services/notification.service";
import { selectSubjects, selectStudents } from "src/app/redux/selectors/combine.selectors";
import { IComponentCanDeactivate } from "src/app/common/entities/component-can-deactivate";
import { initMarksToChangeSubject } from "src/app/redux/actions/subjects.action";
import { ISubject, IMarks, IMark } from "../../../common/entities/subject";
import { ChangeService } from "../../../common/services/change.service";
import { SharedModule } from "../../../shared/shared.module";
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
  private changeService: ChangeService;
  private notificationService: NotificationService;
  private dateClick: number;
  private isChangesMade: boolean = false;
  private isMarksCorrect: boolean = true;
  private router: Router;
  private subjectName: string;
  private subjects: ISubject[] = [];
  private componentDestroyed$: Subject<any> = new Subject();
  private subject: ISubject = {
    id: "",
    index: 0,
    nameSubject: "",
    teacher: "",
    cabinet: 0,
    description: "",
    marks: []
  };
  public students: IStudent[] = [];
  public subjectCopy: ISubject;
  public headerNameStudents: string[] = HEDER_NAME_SUBJECT_PAGE;

  constructor(
    store: Store<IState>,
    changeService: ChangeService,
    notificationService: NotificationService,
    router: Router
  ) {
    this.store = store;
    this.changeService = changeService;
    this.notificationService = notificationService;
    this.router = router;
  }

  private initForm(): void {
    this.subjectName = this.router.url.split("/").pop();
    console.log(this.subjectName);
    this.store.pipe(
      select(selectStudents),
      takeUntil(this.componentDestroyed$)
    ).subscribe(
      data => {
        if (data.length !== 0) {
          this.students = data;
        }
      }
    );

    this.store.pipe(
      select(selectSubjects),
      takeUntil(this.componentDestroyed$)
    )
    .subscribe(data => {
      if (data.length) {
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

  public calculationAverageMark(idStudent: string): number {
    return getAverageMark(this.subject, idStudent);
  }

  public findStudentMark(marks: { id: string; mark: number }[], idStudent: string): number | undefined {
    const markStudent: IMark = marks.find(
      ({ id }: IMark) => id === idStudent
    );

    return markStudent ? markStudent.mark : undefined;
  }

  public onAddDate(date: Date): void {
    const thisDate: number = new Date(date).getTime();
    const isThisDate: boolean = this.subject.marks.some((listMarks: IMarks) => listMarks.date === thisDate);

    if (!isThisDate) {
      this.isChangesMade = true;
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

  public onChangeDate(changeData: Date): void {
    this.isChangesMade = true;
    this.subjectCopy = JSON.parse(JSON.stringify(this.subject));
    const dateCheck: number = changeData.getTime();
    this.subject.marks.forEach(dateMarksList => {
      if (dateMarksList.date === this.dateClick) {
        dateMarksList.date = dateCheck;
      }
    });
  }

  public onSave(): void {
    this.store.dispatch(
      initMarksToChangeSubject({ subject: this.subject })
    );
    this.showToast("Success", "You've saved the change marks", true);
    this.isChangesMade = false;
    this.isMarksCorrect = true;
  }

  public onCancel(): void {
    this.router.navigate(["subjects"]);
  }

  public onClickInput(date: Date): void {
    this.dateClick = +date;
  }

  public modelChanged(newMark: number, date: number, studentId: string): void {
    if (studentId) {
      this.subject.marks = this.changeService.changeMark(this.subject.marks, date, studentId, newMark);
      this.isMarksCorrect = !this.subject.marks.some(
        ({ students }: IMarks) => students.some(
          (mark: IMark) => mark.mark <= 0 || mark.mark > 10
        )
      );
    }
    this.isChangesMade = true;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public canDeactivate(): boolean | Observable<boolean> {
    if (this.isChangesMade && this.isMarksCorrect) {
      return runModalDialog("You have saved any changes.", "If you leaving the page all changes will be lost. Are you leaving this page?");
    } else {
      return true;
    }
  }

  public ngOnDestroy (): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
