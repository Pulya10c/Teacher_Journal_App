import { FormGroup, FormBuilder, Validators, FormsModule, AbstractControl } from "@angular/forms";
import { Component, OnInit, NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

import { NotificationService, NotificationModel } from "../../../common/services/notification.service";
import { initAddStudent } from "src/app/store/actions/students.action";
import { ChangeService } from "src/app/common/services/change.service";
import { SharedModule } from "../../../shared/shared.module";
import { IStudent } from "../../../common/entities/student";
import { IState } from "src/app/common/entities/state";

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
  private changeService: ChangeService;
  private index: number = 0;
  private notificationService: NotificationService;
  private activateRouter: ActivatedRoute;
  private store: Store<IState>;

  constructor(
    fb: FormBuilder,
    router: Router,
    store: Store<IState>,
    changeService: ChangeService,
    activateRouter: ActivatedRoute,
    notificationService: NotificationService
  ) {
    this.studentFormBuilder = fb;
    this.router = router;
    this.store = store;
    this.changeService = changeService;
    this.activateRouter = activateRouter;
    this.notificationService = notificationService;
  }

  private initForm(): void {
    this.studentsForm = this.studentFormBuilder.group({
      name: ["",
      [
        Validators.required,
        Validators.pattern(/^[A-zА-я -]*$/),
        Validators.minLength(2)]
      ],
      lastName: ["",
      [
        Validators.required,
        Validators.pattern(/^[A-zА-я -]*$/),
        Validators.minLength(2)]
      ],
      address: [""],
      about: [""]
    });

    this.activateRouter.queryParams.subscribe(params => {
      this.index = +params.id;
    });
  }

  private showToast(header: string, description: string, success: boolean): void {
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
    const controls: {
      [key: string]: AbstractControl;
    } = this.studentsForm.controls;

    if (this.studentsForm.invalid) {
      Object
      .keys(controls)
      .forEach(
        controlName => controls[controlName].markAsTouched()
      );

      return;
    }
    const student: IStudent = this.changeService.addNewStudent(this.index, this.studentsForm.value);
    this.store.dispatch(
      initAddStudent({ newStudent: student })
    );
    this.showToast("Success", "NEW_STUDENT_ADD", true);
    this.router.navigate(["student"]);
  }

  private onCancel(): void {
    this.router.navigate(["student"]);
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
