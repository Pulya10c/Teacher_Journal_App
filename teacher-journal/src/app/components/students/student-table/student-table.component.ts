import { Component, OnInit, NgModule } from "@angular/core";
import { OrderPipe } from "ngx-order-pipe";
import { SharedModule } from "../../../shared/shared.module";
import { DataService } from "../../../common/services/data.service";
import { StorageService } from "../../../common/services/storage.service";
import { IStudent } from "../../../common/entities/student";
import {
  NotificationService,
  NotificationModel
} from "../../../common/services/notification.service";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Observable, of } from "rxjs";
import { HEDER_NAME_STUDENT_TABL } from "../../../common/constants/student-constant";
import { URL_DB_STUDENTS } from "../../../common/constants/data-constants";

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
  private getDataService: DataService;
  private storageService: StorageService;
  private columnStudentsName: string[] = HEDER_NAME_STUDENT_TABL;
  private sortedStudents: IStudent[] = [];
  private order: string = "index";
  private isReverse: boolean = false;
  private orderPipe: OrderPipe;
  private isStudentTableActive: boolean = true;
  private notificationService: NotificationService;
  private data: any;
  private searchStudent: string = "";

  constructor(
    dataService: DataService,
    orderPipe: OrderPipe,
    storageService: StorageService,
    notificationService: NotificationService
  ) {
    this.getDataService = dataService;
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

    this.getDataService.getHttp(URL_DB_STUDENTS).subscribe(data => {
      this.students = data;
      this.sortedStudents = this.orderPipe.transform(this.students, this.order);
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
    add
  }: {
    visible: boolean;
    newStudent: IStudent;
    add: boolean;
  }): void {
    this.isStudentTableActive = visible;
    if (add) {
      const student: IStudent = this.getDataService.addNewStudent(
        this.students.length,
        newStudent
      );
      this.getDataService
        .postHttp(URL_DB_STUDENTS, student)
        .subscribe(response => this.students.push(response));

      // this.students = this.getDataService.addNewStudent(
      //   this.students,
      //   newStudent
      // );

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
