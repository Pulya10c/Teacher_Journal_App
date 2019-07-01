import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";
import { ExportComponent } from "./components/export/export.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";

const routes: Routes = [
  { path: "", redirectTo: "students", pathMatch: "full" },
  { path: "students", component: StudentTableComponent },
  { path: "subject", component: SubjectsComponent },
  { path: "statistics", component: StatisticsComponent },
  { path: "export", component: ExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
