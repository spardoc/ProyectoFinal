import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  paginas = [
    {titulo: 'Login', path: 'pages/login'},
    {titulo: 'Inicio', path: 'pages/inicio'},
  ]
}
