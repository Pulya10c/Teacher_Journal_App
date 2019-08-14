import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { NotificationService, NotificationModel } from "../../../common/services/notification.service";
import { selectSubjects } from "src/app/redux/selectors/combine.selectors";
import { initAddSubject } from "src/app/redux/actions/subjects.action";
import { ChangeService } from "src/app/common/services/change.service";
import { ISubject } from "../../../common/entities/subject";
import { IState } from "src/app/common/entities/state";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})

export class SubjectFormComponent implements OnInit {
  private store: Store<IState>;
  private subjectsFormBuilder: FormBuilder;
  private router: Router;
  private changeService: ChangeService;
  private notificationService: NotificationService;
  private subjects: ISubject[];
  public subjectForm: FormGroup;

  constructor(
    fb: FormBuilder,
    router: Router,
    store: Store<IState>,
    changeService: ChangeService,
    notificationService: NotificationService
  ) {
    this.subjectsFormBuilder = fb;
    this.router = router;
    this.store = store;
    this.changeService = changeService;
    this.notificationService = notificationService;
  }

  private initForm(): void {
    this.subjectForm = this.subjectsFormBuilder.group({
      nameSubject: ["",
      [
        Validators.required,
        Validators.pattern(/^[A-zА-я -]*$/),
        Validators.minLength(2)]
      ],
      teacher: ["",
      [
        Validators.required,
        Validators.pattern(/^[A-zА-я -.]*$/),
        Validators.minLength(2)]
      ],
      cabiner: [""],
      description: [""]
    });

    this.store.pipe(select(selectSubjects)).subscribe(data => {
      if (data.length) {
        this.subjects = data;
      }
    });
  }

  private showToast(header: string, description: string, success: boolean): void {
    this.notificationService.showToast(new NotificationModel(header, description, success));
  }

  public isControlInvalid(controlName: string): boolean {
    const control: any = this.subjectForm.controls[controlName];
    const result: boolean = control.invalid && control.touched;
    return result;
  }

  public onSubmit(): void {
    if (this.subjectForm.invalid) {
      this.subjectForm.markAllAsTouched();

      return;
    }
    const { subject, isAdd }: { subject: ISubject; isAdd: boolean } = this.changeService
    .addNewSubject(
      this.subjects,
      this.subjectForm.value
    );

    if (isAdd) {
      this.store.dispatch(
        initAddSubject({ newSubject: subject })
      );
      this.showToast("Success", "NEW_SABJECT_ADD", true);
      this.router.navigate(["subjects"]);
    } else {
      this.showToast("Warning", "NEW_SABJECT_ADD_ERROR", false);
      this.router.navigate(["subjects"]);
    }
  }

  public onCancel(): void {
    this.router.navigate(["subjects"]);
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
