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
import { TurnosComponent } from './pages/turnos/turnos.component';
import { HistorialComponent } from './pages/historial/historial/historial.component';
import { PacientesComponent } from './pages/pacientes/pacientes/pacientes.component';
import { HistorialParaEspecialistaComponent } from './pages/historial-para-especialistas/historial-para-especialista/historial-para-especialista.component';
import { StatsComponent } from './pages/stats/stats.component';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';

//

const routes: Routes = [
  { path: "", component: BienvenidoComponent },
  { path: "usuarios", component: ListadoComponent, canActivate: [AdminGuard], data: { animation: 'fadePageLeft' }, loadChildren: () => import('./pages/listadoUsuarios/listado.module').then(m => m.ListadoModule) },
  { path: "mis-turnos", component: MisTurnosComponent, data: { animation: 'FadeIn' }, loadChildren: () => import('../app/pages/mis-turnos/turnos.module').then(m => m.TurnosModule) },
  { path: "turnos", component: TurnosComponent, canActivate: [AdminGuard], data: { animation: 'FadeIn' } },
  { path: "home", component: HomeComponent, data: { animation: 'fadePageLeft' } },
  { path: "login", component: LoginComponent, data: { animation: 'fadePage' } },
  { path: "register", component: RegisterComponent },
  { path: "estadisticas", component: StatsComponent, data: { animation: 'fadePage' } },
  { path: "mi-perfil", component: MiPerfilComponent, data: { animation: 'fadePageLeft' }, loadChildren: () => import('./pages/mi-perfil/MiPerfil.module').then(m => m.MiPerfilModule) },
  { path: "historial", component: HistorialComponent, data: { animation: 'fadePage' }, loadChildren: () => import('./pages/historial/historial.module').then(m => m.HistorialModule) },
  { path: "historia-para-especialistas", data: { animation: 'FadeIn' }, component: HistorialParaEspecialistaComponent, loadChildren: () => import('./pages/historial-para-especialistas/historial-para-especialistas.module').then(m => m.HistorialParaEspecialistasModule) },
  { path: "pacientes", component: PacientesComponent, loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule) },
  { path: "Terminos-y-condiciones", component: PacientesComponent, loadChildren: () => import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule) },
  { path: "opiniones", component: OpinionesComponent, data: { animation: 'FadeIn' }, loadChildren: () => import('./pages/opiniones/opiniones.module').then(m => m.OpinionesModule) },
  { path: "**", redirectTo: 'home' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }