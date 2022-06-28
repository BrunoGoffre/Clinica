import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { ReviewComponent } from './review/review.component';
import { LoadingComponent } from './loading/loading.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    QuestionComponent,
    ReviewComponent,
    LoadingComponent,
    DashboardComponent,
    NavbarComponent,
    ToggleButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    QuestionComponent,
    ReviewComponent,
    LoadingComponent,
    DashboardComponent,
    NavbarComponent,
    ToggleButtonComponent,
  ],
})
export class GeneralComponentsModule { }
