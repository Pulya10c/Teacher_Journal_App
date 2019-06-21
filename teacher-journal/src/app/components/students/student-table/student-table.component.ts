import { Component, OnInit } from "@angular/core";
import { OrderPipe } from "ngx-order-pipe";

import { DataService } from "../../../common/services/data.service";
import { IStudent } from "../../../common/entities/student";

@Component({
  selector: "app-student-table",
  templateUrl: "./student-table.component.html",
  styleUrls: ["./student-table.component.scss"]
  // providers: [DataService]
})

export class StudentTableComponent implements OnInit {
  private students: IStudent[];
  private getDataService: DataService;
  private columnStudentsName: string[];
  private sortedStudents: IStudent[];
  private order: string = "index";
  private isReverse: boolean = false;
  private orderPipe: OrderPipe;

  constructor(dataService: DataService, orderPipe: OrderPipe) {
    this.getDataService = dataService;
    this.orderPipe = orderPipe;
  }

  private setOrder(value: string): void {
    if (this.order === value) {
      this.isReverse = !this.isReverse;
    }
    this.order = value;
  }

  public ngOnInit(): void {
    this.students = this.getDataService.getStudents();
    this.columnStudentsName = this.getDataService
      .getKeysObject(this.students[0])
      .slice(1);
    this.sortedStudents = this.orderPipe.transform(this.students, "index");
  }
}
