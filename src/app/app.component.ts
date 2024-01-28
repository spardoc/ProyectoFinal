import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProyectoFinal';

  pages = [
    {titulo: 'Inicio', path: 'pages/inicio', icon: 'fas fa-home'},
    {titulo: 'Carrito', path: 'pages/carrito', icon: 'fas fa-shopping-cart'},
    {titulo: 'Login', path: 'pages/login', icon: 'fas fa-user'}
  ]
}
