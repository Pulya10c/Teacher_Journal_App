import {
  Component,
  OnInit,
  NgModule,
  Output,
  EventEmitter
} from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule
} from "@angular/forms";
import { ISubject } from "../../../common/entities/subject";
import { BrowserModule } from "@angular/platform-browser";
import { DataService } from "src/app/common/services/data.service";
import { Router } from "@angular/router";
import { ChangeService } from "src/app/common/services/change.service";
import {
  NotificationService,
  NotificationModel
} from "../../../common/services/notification.service";
import {
  URL_DB_SUBJECTS,
  URL_DB,
  DB_SUBJECTS
} from "src/app/common/constants/data-constants";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class SubjectFormComponent implements OnInit {
  private subjectForm: FormGroup;
  private subjectsFormBuilder: FormBuilder;
  private router: Router;
  private dataService: DataService;
  private changeService: ChangeService;
  private notificationService: NotificationService;
  private subjects: ISubject[];

  constructor(
    fb: FormBuilder,
    router: Router,
    dataService: DataService,
    changeService: ChangeService,
    notificationService: NotificationService
  ) {
    this.subjectsFormBuilder = fb;
    this.router = router;
    this.dataService = dataService;
    this.changeService = changeService;
    this.notificationService = notificationService;
  }

  private initForm(): void {
    this.subjectForm = this.subjectsFormBuilder.group({
      nameSubject: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-zА-я -]*$/),
          Validators.minLength(2)
        ]
      ],
      teacher: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-zА-я -.]*$/),
          Validators.minLength(2)
        ]
      ],
      cabiner: [""],
      description: [""]
    });

    this.dataService.getHttp<ISubject>(URL_DB, DB_SUBJECTS).subscribe(data => {
      this.subjects = data;
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

  private isControlInvalid(controlName: string): boolean {
    const control: any = this.subjectForm.controls[controlName];
    const result: boolean = control.invalid && control.touched;
    return result;
  }

  private onSubmit(): void {
    const controls: any = this.subjectForm.controls;

    if (this.subjectForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const { subject, isAdd }:
      { subject: ISubject; isAdd: boolean; } =
        this.changeService.addNewSubject(this.subjects, this.subjectForm.value);

    if (isAdd) {
      this.dataService
        .postHttp<ISubject>(URL_DB_SUBJECTS, subject)
        .subscribe(response => {
          this.showToast(
            "Success",
            `Date ${response.nameSubject} successfully added!`,
            true
          );
          this.router.navigate(["subject"]);
        });
    } else {
      this.showToast(
        "Warning",
        `Subject ${subject.nameSubject} already exists!`,
        false
      );
      this.router.navigate(["subject"]);
    }
  }

  private onCancel(): void {
    this.router.navigate(["subject"]);
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
