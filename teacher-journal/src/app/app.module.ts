import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { OrderModule } from "ngx-order-pipe";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { MarksCorrectionDirective } from "./common/directives/marks-correction.directive";
import { LoaderComponent } from "./components/loader/loader.component";
import { SharedModule } from "./shared/shared.module";
import { NotificationComponent } from "./shared/components/notification/notification.component";
import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsListComponent } from "./components/subjects/subject-list/subjects-list.component";
import { SubjectFormComponent } from "./components/subjects/subject-form/subject-form.component";
import { SubjectPageComponent } from "./components/subjects/subject-page/subject-page.component";
import { StudentFormComponent } from "./components/students/student-form/student-form.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { ExitSubjectPageGuard } from "./components/subjects/subject-page/guards/exit-subject-page.guard";
import { SubjectPageGuard } from "./components/subjects/subject-page/guards/subject-page.guard";
import { ExportComponent } from "./components/export/export.component";
import { PanelComponent } from "./components/panel/panel.component";
import { ScaleButtonDirective } from "./common/directives/scale-button.directive";
import { VisibilityDirective } from "./common/directives/visibility.directive";
import { LoaderInterceptor } from "./common/interceptors/loader.interceptor";
import { LoaderService } from "./common/services/loader.service";
import { SearchPipe } from "./common/pipe/search.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./root/app.component";
import { StudentsEffects } from "./store/effects/students.effect";
import { SubjectsEffects } from "./store/effects/subjects.effect";
import { reducer } from "../app/store/redusers/combine.reducer";

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([
      StudentsEffects,
      SubjectsEffects
    ])
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
