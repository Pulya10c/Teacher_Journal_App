import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./root/app.component";
import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { OrderModule } from "ngx-order-pipe";
import { StudentFormComponent } from "./components/students/student-form/student-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    SubjectsComponent,
    StudentFormComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    OrderModule,
    ReactiveFormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
