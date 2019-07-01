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
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ExportComponent } from './components/export/export.component';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    SubjectsComponent,
    StudentFormComponent,
    StatisticsComponent,
    ExportComponent,
    PanelComponent
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
