import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ListadoComponent } from './components/listado/listado.component';
import { AdminGuard } from './guards/admin.guard';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';


const routes: Routes = [
  { path: "", component: BienvenidoComponent },
  { path: "usuarios", component: ListadoComponent, canActivate: [AdminGuard], data: { animation: 'usuariosPage' } },
  { path: "mis-turnos", component: MisTurnosComponent, data: { animation: 'misTurnosPage' } },
  { path: "home", component: HomeComponent, data: { animation: 'homePage' } },
  { path: "login", component: LoginComponent, data: { animation: 'fadePage' } },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: 'home' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }