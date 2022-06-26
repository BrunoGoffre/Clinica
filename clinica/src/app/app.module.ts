import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './pages/register/register.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ListadoComponent } from './pages/listadoUsuarios/listado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { PipesModule } from './pipes/pipes.module';
import { GeneralComponentsModule } from './components/general-components.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BienvenidoComponent,
    ListadoComponent,
    MiPerfilComponent,
    TurnosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    PipesModule,
    GeneralComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
