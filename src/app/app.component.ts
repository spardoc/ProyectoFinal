import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProyectoFinal';

  pages = [
    {titulo: 'Inicio', path: 'pages/inicio'},
    {titulo: 'Login', path: 'pages/login'}
  ]
}
