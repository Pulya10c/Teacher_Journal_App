import { Component, OnInit, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { OrderPipe } from "ngx-order-pipe";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { HEDER_NAME_STUDENT_TABL } from "../../../common/constants/student-constant";
import { URL_DB, DB_STUDENTS } from "../../../common/constants/data-constants";

import { SharedModule } from "../../../shared/shared.module";
import { DataService } from "../../../common/services/data.service";
import { StorageService } from "../../../common/services/storage.service";
import { IStudent } from "../../../common/entities/student";

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
  private columnStudentsName: string[] = HEDER_NAME_STUDENT_TABL;
  private sortedStudents: IStudent[] = [];
  private order: string = "index";
  private isReverse: boolean = false;
  private orderPipe: OrderPipe;
  private searchStudent: string = "";
  private searchInfo: Subject<string> = new Subject<string>();
  private searchInputText: string;
  private nextIndex: number = this.sortedStudents.length;

  constructor(dataService: DataService, orderPipe: OrderPipe, storageService: StorageService) {
    this.dataService = dataService;
    this.orderPipe = orderPipe;
    this.storageService = storageService;
  }

  private initForm(): void {

    if (!this.storageService.getValueStorage()) {
      this.storageService.setSaveStorage(this.order, this.isReverse);
    } else {
      this.order = this.storageService.getValueStorage().sortName;
      this.isReverse = this.storageService.getValueStorage().revers;
    }

    this.dataService
    .getHttp<IStudent>(URL_DB, DB_STUDENTS)
    .subscribe(
      data => {
        this.students = data;
        this.sortedStudents = this.orderPipe.transform(this.students, this.order);
        this.nextIndex = this.sortedStudents.length;
      }
    );

    this.searchInfo
    .pipe(
      debounceTime(800),
      distinctUntilChanged()
    )
    .subscribe(
      (eventNewText: string) => { this.searchStudent = eventNewText; }
    );
  }

  private onSearch(event: string): void {
    this.searchInfo.next(event);
  }

  private setOrder(newValueOrder: string): void {

    if (this.order === newValueOrder) {
      this.isReverse = !this.isReverse;
    }
    this.order = newValueOrder;
    this.storageService.setSaveStorage(this.order, this.isReverse);
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
