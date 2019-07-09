import { Component, OnInit, NgModule } from "@angular/core";
import { OrderPipe } from "ngx-order-pipe";
import { SharedModule } from "../../../shared/shared.module";
import { DataService } from "../../../common/services/data.service";
import { StorageService } from "../../../common/services/storage.service";
import { ChangeService } from "../../../common/services/change.service";
import { IStudent } from "../../../common/entities/student";
import {
  NotificationService,
  NotificationModel
} from "../../../common/services/notification.service";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { HEDER_NAME_STUDENT_TABL } from "../../../common/constants/student-constant";
import { URL_DB_STUDENTS, URL_DB, DB_STUDENTS } from "../../../common/constants/data-constants";

@Component({
  selector: "app-student-table",
  templateUrl: "./student-table.component.html",
  styleUrls: ["./student-table.component.scss"],
  providers: [StorageService]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class StudentTableComponent implements OnInit {
  private students: IStudent[] = [];
  private dataService: DataService;
  private storageService: StorageService;
  private changeService: ChangeService;
  private columnStudentsName: string[] = HEDER_NAME_STUDENT_TABL;
  private sortedStudents: IStudent[] = [];
  private order: string = "index";
  private isReverse: boolean = false;
  private orderPipe: OrderPipe;
  private isStudentTableActive: boolean = true;
  private notificationService: NotificationService;
  private searchStudent: string = "";
  private searchInfo: Subject<string> = new Subject<string>();
  private searchInputText: string;

  constructor(
    dataService: DataService,
    changeService: ChangeService,
    orderPipe: OrderPipe,
    storageService: StorageService,
    notificationService: NotificationService
  ) {
    this.dataService = dataService;
    this.changeService = changeService;
    this.orderPipe = orderPipe;
    this.storageService = storageService;
    this.notificationService = notificationService;
  }

  private initForm(): void {
    if (!this.storageService.getValueStorage()) {
      this.storageService.setSaveStorage(this.order, this.isReverse);
    } else {
      this.order = this.storageService.getValueStorage().sortName;
      this.isReverse = this.storageService.getValueStorage().revers;
    }

    this.dataService.getHttp<IStudent>(URL_DB, DB_STUDENTS).subscribe(data => {
      this.students = data;
      this.sortedStudents = this.orderPipe.transform(this.students, this.order);
    });

    this.searchInfo
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe((eventNewText: string) => {
        this.searchStudent = eventNewText;
      });
  }

  private onSearch(event: string): void {
    this.searchInfo.next(event);
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

  private setOrder(newValueOrder: string): void {
    if (this.order === newValueOrder) {
      this.isReverse = !this.isReverse;
    }
    this.order = newValueOrder;
    this.storageService.setSaveStorage(this.order, this.isReverse);
  }

  private addStudent({
    visible,
    newStudent,
    isCreateStudent
  }: {
    visible: boolean;
    newStudent: IStudent;
    isCreateStudent: boolean;
  }): void {
    this.isStudentTableActive = visible;
    if (isCreateStudent) {
      const student: IStudent = this.changeService.addNewStudent(
        this.students.length,
        newStudent
      );
      this.dataService
        .postHttp<IStudent>(URL_DB_STUDENTS, student)
        .subscribe(response => {
          this.students = [...this.students, response];
          this.sortedStudents = this.orderPipe.transform(
            this.students,
            this.order
          );
        });

      this.showToast(
        "Success",
        `Student ${newStudent.lastName} successfully added!`,
        true
      );
      this.sortedStudents = this.orderPipe.transform(this.students, this.order);
    }
  }

  private onVisibleFormStudent(): void {
    this.isStudentTableActive = !this.isStudentTableActive;
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
