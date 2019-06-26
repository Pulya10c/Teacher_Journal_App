import {
  Component,
  OnInit,
  NgModule,
  Input,
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
  }> = new EventEmitter<{ visible: boolean; newSubject: ISubject }>();

  private subjectForm: FormGroup;
  private subjectsFormBuilder: FormBuilder;

  constructor(fb: FormBuilder) {
    this.subjectsFormBuilder = fb;
  }

  private initForm(): void {
    this.subjectForm = this.subjectsFormBuilder.group({
      name: [
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
      [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(2)
      ]
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

    this.onVisibleForm.emit({visible: true, newSubject: this.subjectForm.value});
  }

  private onCancel(): void {
    this.onVisibleForm.emit({visible: true, newSubject: this.subjectForm.value});
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
