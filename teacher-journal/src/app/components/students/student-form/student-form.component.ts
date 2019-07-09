import {
  Component,
  OnInit,
  NgModule,
  Output,
  EventEmitter
} from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IStudent } from "../../../common/entities/student";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.scss"]
})
@NgModule({
  imports: [SharedModule]
})
export class StudentFormComponent implements OnInit {
  @Output() private onVisibleForm: EventEmitter<{
    visible: boolean;
    newStudent: IStudent;
    isCreateStudent: boolean;
  }> = new EventEmitter<{
    visible: boolean;
    newStudent: IStudent;
    isCreateStudent: boolean
  }>();

  private studentsForm: FormGroup;
  private studentFormBuilder: FormBuilder;

  constructor(fb: FormBuilder) {
    this.studentFormBuilder = fb;
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

    this.onVisibleForm.emit({visible: true, newStudent: this.studentsForm.value, isCreateStudent: true});
  }

  private onCancel(): void {

    this.onVisibleForm.emit({visible: true, newStudent: this.studentsForm.value, isCreateStudent: false});
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
