import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from './components/loading/loading.component';
import { RegisterComponent } from './pages/register/register.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ListadoComponent } from './components/listado/listado.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { AddTurnoComponent } from './components/add-turno/add-turno.component';
import { ReviewComponent } from './components/review/review.component';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    LoadingComponent,
    RegisterComponent,
    BienvenidoComponent,
    ListadoComponent,
    ToggleButtonComponent,
    MisTurnosComponent,
    AddTurnoComponent,
    ReviewComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
