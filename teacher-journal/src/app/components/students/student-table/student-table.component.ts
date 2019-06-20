import { Component, OnInit } from "@angular/core";

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

  constructor(dataService: DataService) {
    this.getDataService = dataService;
  }

  public ngOnInit(): void {
    this.students = this.getDataService.getStudents();
    this.columnStudentsName = this.getDataService
      .getKeysObject(this.students[0])
      .slice(1);
  }
}
