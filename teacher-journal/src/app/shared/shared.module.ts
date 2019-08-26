import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MessageComponent } from "./components/message/message.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ForbidComponent } from "./components/forbid/forbid.component";

@NgModule({
  declarations: [MessageComponent, ForbidComponent],
  imports: [CommonModule, FormsModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MessageComponent],
  entryComponents: [MessageComponent]
})
export class SharedModule {}
