import { Component, OnInit, NgModule, Input } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { DataService } from "../../../common/services/data.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule
} from "@angular/forms";
import { IStudent } from "../../../common/entities/student";
import { Router } from "@angular/router";
import { URL_DB_STUDENTS } from "../../../common/constants/data-constants";
import {
  NotificationService,
  NotificationModel
} from "../../../common/services/notification.service";
import { ChangeService } from "src/app/common/services/change.service";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.scss"]
})
@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule]
})
export class StudentFormComponent implements OnInit {
  private studentsForm: FormGroup;
  private studentFormBuilder: FormBuilder;
  private router: Router;
  private dataService: DataService;
  private changeService: ChangeService;
  private index: number = 0;
  private notificationService: NotificationService;
  private activateRouter: ActivatedRoute;

  constructor(
    fb: FormBuilder,
    router: Router,
    dataService: DataService,
    changeService: ChangeService,
    activateRouter: ActivatedRoute,
    notificationService: NotificationService
  ) {
    this.studentFormBuilder = fb;
    this.router = router;
    this.dataService = dataService;
    this.changeService = changeService;
    this.activateRouter = activateRouter;
    this.notificationService = notificationService;
  }

  private initForm(): void {
    this.studentsForm = this.studentFormBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-zА-я -]*$/),
          Validators.minLength(2)
        ]
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-zА-я -]*$/),
          Validators.minLength(2)
        ]
      ],
      address: [""],
      about: [""]
    });

    this.activateRouter
      .queryParams
      .subscribe(params => {
        this.index = +params.id;
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
    const control: any = this.studentsForm.controls[controlName];
    const result: boolean = control.invalid && control.touched;
    return result;
  }

  private onSubmit(): void {
    const controls: any = this.studentsForm.controls;

    if (this.studentsForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const student: IStudent = this.changeService.addNewStudent(
      this.index,
      this.studentsForm.value
    );
    this.dataService
      .postHttp<IStudent>(URL_DB_STUDENTS, student)
      .subscribe(response => {
        this.showToast("Success", "Date  successfully added!", true);
        this.router.navigate(["student"]);
      });
  }

  private onCancel(): void {
    this.router.navigate(["student"]);
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
