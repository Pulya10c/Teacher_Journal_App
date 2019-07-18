import { Component, OnInit, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Subject } from "rxjs";

import { OrderPipe } from "ngx-order-pipe";

import { HEDER_NAME_STUDENT_TABL } from "../../../common/constants/student-constant";

import { SharedModule } from "../../../shared/shared.module";
import { StorageService } from "../../../common/services/storage.service";
import { IStudent } from "../../../common/entities/student";
import { select, Store } from "@ngrx/store";
import { IState } from "src/app/common/entities/state";
import { selectStudents } from "src/app/store/selectors/combine.selectors";

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
  private store: Store<IState>;

  constructor(orderPipe: OrderPipe, storageService: StorageService, store: Store<IState>) {
    this.orderPipe = orderPipe;
    this.storageService = storageService;
    this.store = store;
  }

  private initForm(): void {
    if (!this.storageService.getValueStorage()) {
      this.storageService.setSaveStorage(this.order, this.isReverse);
    } else {
      this.order = this.storageService.getValueStorage().sortName;
      this.isReverse = this.storageService.getValueStorage().revers;
    }

    this.store
    .pipe(
      select(selectStudents)
    ).subscribe(
      data => {
        if (data.length) {
          this.students = data;
          this.sortedStudents = this.orderPipe.transform(this.students, this.order);
          this.nextIndex = this.sortedStudents.length;
        }
      }
    );

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
