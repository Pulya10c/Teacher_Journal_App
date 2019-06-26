import { Component, OnInit, NgModule } from "@angular/core";
import { DataService } from "../../../common/services/data.service";
import { ISubject } from "../../../common/entities/subject";
import { SharedModule } from "../../../shared/shared.module";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects-list.component.html",
  styleUrls: ["./subjects-list.component.scss"]
})
@NgModule({
  imports: [SharedModule]
})
export class SubjectsListComponent implements OnInit {
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
  }
}
