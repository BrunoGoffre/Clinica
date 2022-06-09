import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ListadoComponent } from './components/listado/listado.component';


const routes: Routes = [
  { path: "", component: BienvenidoComponent },
  {
    path: "home", component: HomeComponent, children: [
      { path: "usuarios", component: ListadoComponent, }]
  },
  { path: "usuario", component: ListadoComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: 'home' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }