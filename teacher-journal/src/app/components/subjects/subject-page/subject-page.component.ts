import { Component, OnInit, NgModule, Input } from "@angular/core";
import { DataService } from "../../../common/services/data.service";
import { ISubject } from "../../../common/entities/subject";
import { IStudent } from "../../../common/entities/student";
import { SharedModule } from "../../../shared/shared.module";
import { MarksService } from "../../../common/services/marks.service";
import { IResultTableSubject } from "../../../common/entities/resultstablesubject";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-subject-page",
  templateUrl: "./subject-page.component.html",
  styleUrls: ["./subject-page.component.scss"],
  providers: [MarksService]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class SubjectPageComponent implements OnInit {
  private getDataService: DataService;
  private students: IStudent[];
  private subject: ISubject;
  private headerNameDate: string[];
  private headerNameStudents: string[];
  private getMarksService: MarksService;
  private resultsTableSubject: IResultTableSubject[];
  private newDate: any;

  @Input() public subjectName: string;

  constructor(dataService: DataService, marksService: MarksService) {
    this.getDataService = dataService;
    this.getMarksService = marksService;
  }
  private initForm(): void {
    console.log(this.subjectName);
    this.students = this.getDataService.getStudents();
    this.subject = this.getDataService
      .getSubjects()
      .filter(subject => subject.nameSubject === this.subjectName)[0];
    this.headerNameStudents = ["Name", "Last Name", "Average Mark"];
    this.headerNameDate = Object.keys(this.subject.marks);
    this.resultsTableSubject = this.getMarksService.getMarks(this.subjectName);
  }

  private onAddDate(abs: any): void {}

  private onSave(): void {
    console.log(this.newDate);
    this.getDataService.addNewSubject(this.subject);
    this.initForm();
  }

  private modelChanged(
    event: string,
    idxStudent: number,
    idxMarks: number,
    change: boolean
  ): void {
    const response: {
      subject: ISubject;
      date: any;
    } = this.getMarksService.updateChanges(
      event,
      idxStudent,
      idxMarks,
      change,
      this.resultsTableSubject,
      this.headerNameDate,
      this.subject
    );
    if (response.date && change) {
      this.headerNameDate[idxMarks] = response.date[0];
    }
    this.subject = response.subject;
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
