import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsListComponent } from "./components/subjects/subject-list/subjects-list.component";
import { ExportComponent } from "./components/export/export.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { StudentFormComponent } from "./components/students/student-form/student-form.component";
import { SubjectFormComponent } from "./components/subjects/subject-form/subject-form.component";
import { SubjectPageComponent } from "./components/subjects/subject-page/subject-page.component";
import { SubjectPageGuard } from "./components/subjects/subject-page/subject-page.guard";
import { ExitSubjectPageGuard } from "./components/subjects/subject-page/exit-subject-page.guard";

const routes: Routes = [
  { path: "", redirectTo: "student", pathMatch: "full" },
  { path: "student", component: StudentTableComponent },
  { path: "student/form", component: StudentFormComponent },
  { path: "subject", component: SubjectsListComponent },
  { path: "subject/form", component: SubjectFormComponent },
  {
    path: "subject/:name",
    component: SubjectPageComponent,
    canActivate: [SubjectPageGuard],
    canDeactivate: [ExitSubjectPageGuard]
  },
  { path: "statistics", component: StatisticsComponent },
  { path: "export", component: ExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
