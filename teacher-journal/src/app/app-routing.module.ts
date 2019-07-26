import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsListComponent } from "./components/subjects/subject-list/subjects-list.component";
import { ExportComponent } from "./components/export/export.component";
import { StatisticsComponent } from "./components/statistics/statistics-panel/statistics.component";
import { StudentFormComponent } from "./components/students/student-form/student-form.component";
import { SubjectFormComponent } from "./components/subjects/subject-form/subject-form.component";
import { SubjectPageComponent } from "./components/subjects/subject-page/subject-page.component";
import { SubjectPageGuard } from "./common/guards/subject-page.guard";
import { ExitSubjectPageGuard } from "./common/guards/exit-subject-page.guard";
import { StatisticsSubjectsComponent } from "./components/statistics/statistics-subjects/statistics-subjects.component";
import { StatisticsStudentsComponent } from "./components/statistics/statistics-students/statistics-students.component";
import { StatisticsInfoComponent } from "./components/statistics/statistics-info/statistics-info.component";

const routes: Routes = [
  { path: "", redirectTo: "students", pathMatch: "full" },
  { path: "students", component: StudentTableComponent },
  { path: "students/form", component: StudentFormComponent },
  { path: "subjects", component: SubjectsListComponent },
  { path: "subjects/form", component: SubjectFormComponent },
  {
    path: "subjects/:name",
    component: SubjectPageComponent,
    canActivate: [SubjectPageGuard],
    canDeactivate: [ExitSubjectPageGuard]
  },
  {
    path: "statistics",
    component: StatisticsComponent,
    children:
      [
        { path: "", redirectTo: "students", pathMatch: "full" },
        { path: "subjects", component: StatisticsSubjectsComponent },
        { path: "students", component: StatisticsStudentsComponent, children:
          [
            { path: ":name", component: StatisticsInfoComponent }
          ]
        }
      ]
  },
  { path: "export", component: ExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
