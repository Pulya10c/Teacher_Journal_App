import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentTableComponent } from "./components/students/student-table/student-table.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";

const routes: Routes = [
  { path: "", redirectTo: "students", pathMatch: "full" },
  { path: "students", component: StudentTableComponent },
  { path: "subject", component: SubjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
