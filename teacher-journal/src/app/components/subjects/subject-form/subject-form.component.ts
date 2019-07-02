import {
  Component,
  OnInit,
  NgModule,
  Output,
  EventEmitter
} from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ISubject } from "../../../common/entities/subject";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})
@NgModule({
  imports: [SharedModule]
})
export class SubjectFormComponent implements OnInit {

  @Output() private onVisibleForm: EventEmitter<{
    visible: boolean;
    newSubject: ISubject;
    add: boolean;
  }> = new EventEmitter<{ visible: boolean; newSubject: ISubject, add: boolean }>();

  private subjectForm: FormGroup;
  private subjectsFormBuilder: FormBuilder;

  constructor(fb: FormBuilder) {
    this.subjectsFormBuilder = fb;
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
      cabiner: ["",
    ],
      description: [""]
    });
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

    this.onVisibleForm.emit({visible: true, newSubject: this.subjectForm.value, add: true});
  }

  private onCancel(): void {
    this.onVisibleForm.emit({visible: true, newSubject: this.subjectForm.value, add: false});
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
