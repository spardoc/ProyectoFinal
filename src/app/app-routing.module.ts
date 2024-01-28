import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { Carrito2Component } from './pages/carrito2/carrito2.component';
import { Carrito3Component } from './pages/carrito3/carrito3.component';


const routes: Routes = [
  { path: 'pages/login', component: LoginComponent },
  { path: 'pages/inicio', component: InicioComponent },
  { path: 'pages/carrito', component: CarritoComponent },
  { path: 'pages/carrito2', component: Carrito2Component },
  { path: 'pages/carrito3', component: Carrito3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
