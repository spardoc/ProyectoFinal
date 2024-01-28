import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito2',
  templateUrl: './carrito2.component.html',
  styleUrls: ['./carrito2.component.scss']
})
export class Carrito2Component {
  constructor(private router: Router) {}

  
  proceder(): void {
    
    this.router.navigate(['pages/carrito3']); // Asegúrate de que '/checkout' sea la ruta correcta
  }

}
