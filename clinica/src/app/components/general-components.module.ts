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
import { CardPacienteComponent } from './card-paciente/card-paciente.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    QuestionComponent,
    ReviewComponent,
    LoadingComponent,
    DashboardComponent,
    NavbarComponent,
    ToggleButtonComponent,
    CardPacienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    QuestionComponent,
    ReviewComponent,
    LoadingComponent,
    DashboardComponent,
    NavbarComponent,
    ToggleButtonComponent,
    CardPacienteComponent,
  ],
})
export class GeneralComponentsModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}