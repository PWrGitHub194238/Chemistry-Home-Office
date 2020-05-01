import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { NgScrollbarModule } from "ngx-scrollbar";
import { MaterialDesignModule } from "../material-design.module";
import { SharedModule } from "../shared/shared.module";
import { InViewportModule } from "ng-in-viewport";
import { FaqRoutingModule } from "./faq-routing.module";
import { ForSelectComponent } from "./components/for-select/for-select.component";
import { ForStudentComponent } from "./components/for-student/for-student.component";
import { ForTeacherComponent } from "./components/for-teacher/for-teacher.component";
import { ForPointComponent } from "./components/for-point/for-point.component";
import { ForDescriptionComponent } from "./components/for-description/for-description.component";
import { ForDescriptionPointComponent } from "./components/for-description-point/for-description-point.component";

@NgModule({
  declarations: [
    ForSelectComponent,
    ForTeacherComponent,
    ForStudentComponent,
    ForPointComponent,
    ForDescriptionComponent,
    ForDescriptionPointComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialDesignModule,
    FlexLayoutModule,
    NgScrollbarModule,
    MatCarouselModule,
    InViewportModule,
    FaqRoutingModule
  ]
})
export class FaqModule {}
