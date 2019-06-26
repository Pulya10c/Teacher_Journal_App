import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsListComponent } from "./components/subjects/subject-list/subjects-list.component";
import { ExportComponent } from "./components/export/export.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";

const routes: Routes = [
  { path: "", redirectTo: "students", pathMatch: "full" },
  { path: "students", component: StudentTableComponent },
  { path: "subject", component: SubjectsListComponent },
  { path: "statistics", component: StatisticsComponent },
  { path: "export", component: ExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
