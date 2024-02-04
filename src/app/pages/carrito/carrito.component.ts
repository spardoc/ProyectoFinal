import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  cartOpen: boolean = true;

  constructor(private router: Router) {}

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }
  redirectToCheckout(): void {
    
    this.router.navigate(['pages/carrito2']); // Asegúrate de que '/checkout' sea la ruta correcta
  }
}
