import {
  Component,
  OnInit,
  NgModule,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
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
  URL_DB_STUDENTS,
  URL_DB_SUBJECTS
} from "../../../common/constants/data-constants";

@Component({
  selector: "app-subject-page",
  templateUrl: "./subject-page.component.html",
  styleUrls: ["./subject-page.component.scss"]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class SubjectPageComponent implements OnInit {
  private dataService: DataService;
  private students: IStudent[] = [];
  private subjectCopy: ISubject;
  private headerNameStudents: string[] = HEDER_NAME_SUBJECT_PAGE;
  private changeService: ChangeService;
  private notificationService: NotificationService;
  private dateClick: number;
  private subject: ISubject = {
    id: "",
    index: 0,
    nameSubject: "",
    teacher: "",
    cabinet: 0,
    description: "",
    marks: []
  };

  @Output() private onVisiblePage: EventEmitter<boolean> = new EventEmitter<
    false
  >();
  @Input() public subjectName: string;
  @Input() public subjects: ISubject[];

  constructor(
    dataService: DataService,
    changeService: ChangeService,
    notificationService: NotificationService
  ) {
    this.dataService = dataService;
    this.changeService = changeService;
    this.notificationService = notificationService;
  }
  private initForm(): void {

    this.dataService.getHttpStudents(URL_DB_STUDENTS).subscribe(data => {
      this.students = data;
    });

    this.subject = this.subjects.find(
      subject => subject.nameSubject === this.subjectName
    );

    this.subject.marks.sort(sortDate);
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
      .subscribe((response: ISubject) => (this.subjectCopy.marks = response.marks));
  }

  private onCancel(): void {
    this.onVisiblePage.emit(false);
    this.subject.marks = this.subjectCopy.marks;
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
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
