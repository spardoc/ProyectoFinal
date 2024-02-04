import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProyectoFinal';

  isCartOpen = false;

  pages = [
    {titulo: 'Inicio', path: 'pages/inicio', icon: 'fas fa-home'},
    {titulo: 'Carrito', icon: 'fas fa-shopping-cart'},
    {titulo: 'Login', path: 'pages/login', icon: 'fas fa-user'}
  ]
  constructor(public cartService: CartService, private router: Router) { 
    this.cartService = cartService;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  redirectToCheckout(): void {
    
    this.router.navigate(['pages/carrito2']); // Asegúrate de que '/checkout' sea la ruta correcta
    this.isCartOpen = !this.isCartOpen;
  }

  
}
