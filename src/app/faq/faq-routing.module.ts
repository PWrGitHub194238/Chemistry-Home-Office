import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForSelectComponent } from "./components/for-select/for-select.component";
import { ForStudentComponent } from "./components/for-student/for-student.component";
import { ForTeacherComponent } from "./components/for-teacher/for-teacher.component";
import { faqChildStudentPath, faqChildTeacherPath } from "./faq-routing.const";

const routes: Routes = [
  {
    path: "",
    component: ForSelectComponent,
    children: [
      {
        path: faqChildStudentPath,
        component: ForStudentComponent,
        data: { animation: faqChildStudentPath }
      },

      {
        path: faqChildTeacherPath,
        component: ForTeacherComponent,
        data: { animation: faqChildTeacherPath }
      },
      {
        path: "**",
        redirectTo: "student"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule {}
