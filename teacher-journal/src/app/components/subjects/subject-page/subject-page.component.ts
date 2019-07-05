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
import { ISubject } from "../../../common/entities/subject";
import { IStudent } from "../../../common/entities/student";
import { SharedModule } from "../../../shared/shared.module";
import { MarksService } from "../../../common/services/marks.service";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HEDER_NAME_SUBJECT_PAGE } from "../../../common/constants/subject-constants";
import sortDate from "../../../common/helpers/sort-date";

@Component({
  selector: "app-subject-page",
  templateUrl: "./subject-page.component.html",
  styleUrls: ["./subject-page.component.scss"]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class SubjectPageComponent implements OnInit {
  @Output() private onVisiblePage: EventEmitter<boolean> = new EventEmitter<
    false
  >();

  private getDataService: DataService;
  private students: IStudent[];
  private subject: ISubject;
  private subjectCopy: ISubject;
  private headerNameStudents: string[] = HEDER_NAME_SUBJECT_PAGE;
  private getMarksService: MarksService;

  private notificationService: NotificationService;
  private subjects: ISubject[];
  private dateClick: number;

  @Input() public subjectName: string;

  constructor(
    dataService: DataService,
    marksService: MarksService,
    notificationService: NotificationService
  ) {
    this.getDataService = dataService;
    this.getMarksService = marksService;
    this.notificationService = notificationService;
  }
  private initForm(): void {
    this.subjects = this.getDataService.getSubjects();
    this.students = this.getDataService.getStudents();
    this.subject = this.getDataService
      .getSubjects()
      .find(subject => subject.nameSubject === this.subjectName);
    this.subject.marks.sort(sortDate);
    // console.log(this.subject);
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
    let numberOfMarks: number = 0;
    let averageMark: number = this.subject.marks.reduce(
      (summ: number, { students }: any) => {
        const findStudent: any = students.find(({ _id }) => _id === idStudent);

        if (findStudent) {
          summ += findStudent.mark;
          numberOfMarks++;
        }

        return summ;
      },
      0
    );

    averageMark =
      Math.round(
        ((averageMark / numberOfMarks) * Math.pow(10, 21)) / Math.pow(10, 19)
      ) / 100;

    return averageMark;
  }

  private findStudentMark(
    marks: { _id: string; mark: number }[],
    idStudent: string
  ): any {
    const markStudent: { _id: string; mark: number } = marks.find(
      ({ _id }: { _id: String }) => _id === idStudent
    );
    return markStudent ? markStudent.mark : undefined;
  }

  private onAddDate(newDate: Date): void {
    const newObjectDate: { date: number; students: undefined[] } = {
      date: new Date(newDate).getTime(),
      students: []
    };
    this.subject.marks.push(newObjectDate);
    this.subject.marks.sort(sortDate);
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
    this.showToast("Success", `Changes saved!`, true);
    console.log("до", this.subject.marks);
    console.log(this.subjectCopy.marks);
    this.subjectCopy.marks = this.subject.marks;
  }

  private onClickInput(date: Date): void {
    this.dateClick = +date;
  }

  private modelChanged(newMark: number, date: number, studentId: string): void {
    this.subject.marks = this.getMarksService.changeMark(
      this.subject.marks,
      date,
      studentId,
      newMark
    );
  }

  private onCancel(): void {
    console.log(this.subject.marks);
    console.log(this.subjectCopy.marks);
    this.onVisiblePage.emit(false);
    this.subject.marks = this.subjectCopy.marks;
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
