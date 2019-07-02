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
  private students: IStudent[];
  private getDataService: DataService;
  private storageService: StorageService;
  private columnStudentsName: string[];
  private sortedStudents: IStudent[];
  private order: string = "index";
  private isReverse: boolean = false;
  private orderPipe: OrderPipe;
  private isStudentTableActive: boolean = true;
  private notificationService: NotificationService;

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

  private addStudent(value: {
    visible: boolean;
    newStudent: IStudent;
    add: boolean;
  }): void {
    this.isStudentTableActive = value.visible;
    if (value.add) {
      this.students = this.getDataService.addNewStudent(value.newStudent);
      this.showToast(
        "Success",
        `Student ${value.newStudent.lastName} successfully added!`,
        true
      );
      this.initForm();
    }
  }

  private onVisibleFormStudent(): void {
    this.isStudentTableActive = !this.isStudentTableActive;
  }

  private initForm(): void {
    if (!this.storageService.getValueStorage()) {
      this.storageService.setSaveStorage(this.order, this.isReverse);
    } else {
      this.order = this.storageService.getValueStorage().sortName;
      this.isReverse = this.storageService.getValueStorage().revers;
    }

    this.students = this.getDataService.getStudents();
    this.columnStudentsName = this.getDataService
      .getKeysObject(this.students[0])
      .slice(1);
    this.sortedStudents = this.orderPipe.transform(this.students, this.order);
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
