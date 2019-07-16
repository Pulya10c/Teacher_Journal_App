import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./app.effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./root/app.component";
import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsListComponent } from "./components/subjects/subject-list/subjects-list.component";
import { SharedModule } from "./shared/shared.module";
import { OrderModule } from "ngx-order-pipe";
import { StudentFormComponent } from "./components/students/student-form/student-form.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { ExportComponent } from "./components/export/export.component";
import { PanelComponent } from "./components/panel/panel.component";
import { SubjectFormComponent } from "./components/subjects/subject-form/subject-form.component";
import { SubjectPageComponent } from "./components/subjects/subject-page/subject-page.component";
import { NotificationComponent } from "./shared/components/notification/notification.component";
import { SearchPipe } from "./common/pipe/search.pipe";
import { VisibilityDirective } from "./common/directives/visibility.directive";
import { ScaleButtonDirective } from "./common/directives/scale-button.directive";
import { MarksCorrectionDirective } from "./common/directives/marks-correction.directive";
import { SubjectPageGuard } from "./components/subjects/subject-page/guards/subject-page.guard";
import { ExitSubjectPageGuard } from "./components/subjects/subject-page/guards/exit-subject-page.guard";
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { LoaderInterceptor } from "./common/interceptors/loader.interceptor";
import { LoaderService } from "./common/services/loader.service";
import { reducer } from "../app/store/redusers/combine.reducer";

@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    SubjectsListComponent,
    StudentFormComponent,
    StatisticsComponent,
    ExportComponent,
    PanelComponent,
    SubjectFormComponent,
    SubjectPageComponent,
    NotificationComponent,
    SearchPipe,
    VisibilityDirective,
    ScaleButtonDirective,
    MarksCorrectionDirective,
    LoaderComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    OrderModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([AppEffects])
  ],

  providers: [
    SubjectPageGuard,
    ExitSubjectPageGuard,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
