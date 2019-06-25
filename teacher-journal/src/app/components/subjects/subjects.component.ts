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
  private subjectName: string;
  private isVisibleSubjectList: boolean;
  private subject: ISubject;

  constructor(dataService: DataService) {
    this.getDataService = dataService;
    this.isVisibleSubjectList = false;
  }

  private onViewSubjectList(event: Event): void {
    this.subjectName = (<HTMLButtonElement>event.target).innerText;
    this.isVisibleSubjectList = true;
    this.subjects.forEach(subjectItem => {
      if (subjectItem.nameSubject === this.subjectName) {
        this.subject = subjectItem;
      }
    });
    console.log(this.subject);
  }

  public ngOnInit(): void {
    this.subjects = this.getDataService.getSubjects();
    // console.log(this.subjects);
  }
}
