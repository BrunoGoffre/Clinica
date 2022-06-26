import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ListadoComponent } from './pages/listadoUsuarios/listado.component';
import { AdminGuard } from './guards/admin.guard';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
// import { PacienteGuard } from './guards/paciente.guard';
// import { EspecialistaGuard } from './guards/especialista.guard';
import { TurnosComponent } from './pages/turnos/turnos.component';

//

const routes: Routes = [
  { path: "", component: BienvenidoComponent },
  { path: "usuarios", component: ListadoComponent, canActivate: [AdminGuard], data: { animation: 'usuariosPage' } },
  { path: "mis-turnos", component: MisTurnosComponent, loadChildren: () => import('../app/pages/mis-turnos/turnos.module').then(m => m.TurnosModule) },
  { path: "turnos", component: TurnosComponent, canActivate: [AdminGuard] },
  { path: "home", component: HomeComponent, data: { animation: 'homePage' } },
  { path: "login", component: LoginComponent, data: { animation: 'fadePage' } },
  { path: "register", component: RegisterComponent },
  { path: "mi-perfil", component: MiPerfilComponent, },
  { path: "**", redirectTo: 'home' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }