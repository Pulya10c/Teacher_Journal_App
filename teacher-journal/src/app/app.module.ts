import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { OrderModule } from "ngx-order-pipe";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { ChartsModule } from "ng2-charts";

import { LoaderComponent } from "./components/loader/loader.component";
import { SharedModule } from "./shared/shared.module";
import { NotificationComponent } from "./shared/components/notification/notification.component";
import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsListComponent } from "./components/subjects/subject-list/subjects-list.component";
import { SubjectFormComponent } from "./components/subjects/subject-form/subject-form.component";
import { SubjectPageComponent } from "./components/subjects/subject-page/subject-page.component";
import { StudentFormComponent } from "./components/students/student-form/student-form.component";
import { StatisticsComponent } from "./components/statistics/statistics-panel/statistics.component";

import { ExportComponent } from "./components/export/export.component";
import { PanelComponent } from "./components/panel/panel.component";
import { ScaleButtonDirective } from "./common/directives/scale-button.directive";
import { VisibilityDirective } from "./common/directives/visibility.directive";
import { LoaderInterceptor } from "./common/interceptors/loader.interceptor";
import { LoaderService } from "./common/services/loader.service";
import { SearchPipe } from "./common/pipe/search.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./root/app.component";
import { StatisticsInfoComponent } from "./components/statistics/statistics-info/statistics-info.component";
import { StatisticsSubjectsComponent } from "./components/statistics/statistics-subjects/statistics-subjects.component";
import { StatisticsStudentsComponent } from "./components/statistics/statistics-students/statistics-students.component";
import { reducer } from "./redux/redusers/combine.reducer";
import { StudentsEffects } from "./redux/effects/students.effect";
import { SubjectsEffects } from "./redux/effects/subjects.effect";
import { SubjectPageGuard } from "./common/guards/subject-page.guard";
import { ExitSubjectPageGuard } from "./common/guards/exit-subject-page.guard";
import { ChartComponent } from "./components/statistics/chart/chart.component";
import { ElementSizeDirective } from "./common/directives/element-size.directive";
import { TreeviewModule } from "ngx-treeview";

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

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
    LoaderComponent,
    StatisticsInfoComponent,
    StatisticsSubjectsComponent,
    StatisticsStudentsComponent,
    ChartComponent,
    ElementSizeDirective,
  ],

  imports: [
    ChartsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OrderModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([StudentsEffects, SubjectsEffects]),
    TreeviewModule.forRoot(),
    SharedModule,
  ],

  providers: [
    SubjectPageGuard,
    ExitSubjectPageGuard,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
