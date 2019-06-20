import { Component, OnInit, NgModule } from "@angular/core";
import { DataService } from "../../../app/common/services/data.service";
import { ISubject } from "../../../app/common/entities/subject";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"]
})

@NgModule({
  imports: [SharedModule]
})

export class SubjectsComponent implements OnInit {
  private subjects: ISubject[];
  private getDataService: DataService;

  constructor(dataService: DataService) {
    this.getDataService = dataService;
  }

  public ngOnInit(): void {
    this.subjects = this.getDataService.getSubjects();

    console.log(this.subjects);
  }
}
