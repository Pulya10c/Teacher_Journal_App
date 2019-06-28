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
  private isVisibleSubjectList: boolean = true;
  private subject: ISubject;
  private isVisibleSubjectPage: boolean = false;

  constructor(dataService: DataService) {
    this.getDataService = dataService;
  }

  private onViewSubjectList(event: Event): void {
    this.subjectName = (<HTMLButtonElement>event.target).innerText;
    this.isVisibleSubjectPage = true;
    this.subjects.forEach(subjectItem => {
      if (subjectItem.nameSubject === this.subjectName) {
        this.subject = subjectItem;
      }
    });
    // console.log(this.subject);
  }

  private initForm(): void {
    this.subjects = this.getDataService.getSubjects();
  }

  private onVisibleFormSubject(): void {
    this.isVisibleSubjectList = !this.isVisibleSubjectList;
  }

  private addSubject(value: {
    visible: boolean;
    newSubject: ISubject;
  }): void {
    this.isVisibleSubjectList = value.visible;
    this.subjects = this.getDataService.addNewSubject(value.newSubject);
    this.initForm();
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
