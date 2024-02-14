import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DetalleCarrito } from './domain/detalleCarrito';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProyectoFinal';
  detalles: DetalleCarrito[] = [];
  isCartOpen = false;
  filtroNombre: string = '';
  detallesFiltrados: DetalleCarrito[] = [];

  pages = [
    { titulo: 'Inicio', path: 'pages/inicio', icon: 'fas fa-home' },
    { titulo: 'Carrito', icon: 'fas fa-shopping-cart' },
    { titulo: 'Login', path: 'pages/login', icon: 'fas fa-user' }
  ];
  
  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToCartUpdates();
    this.navigateToHomeIfLoggedIn();
    this.filtrarDetalles();
  }

  subscribeToCartUpdates() {
    this.cartService.carritoActualizado$.subscribe(carrito => {
      if (carrito) {
        this.detalles = carrito.detalles || [];
      }
    });
  }

  navigateToHomeIfLoggedIn() {
    if (this.authService.getAuthStatus()) {
      const codigoCliente = this.authService.getCodigoCliente();
      if (codigoCliente) {
        this.cartService.obtenerCarritoCliente(codigoCliente).subscribe(carrito => {
          this.cartService.actualizarCarrito(carrito);
        }, error => {
          console.error('Error al recuperar el carrito: ', error);
        });
      }
    }
    this.router.navigate(['pages/inicio']);
  }

  toggleCart() {
    this.cartService.toggleCart();
    this.isCartOpen = !this.isCartOpen;
  }

  redirectToCheckout() {
    this.router.navigate(['pages/carrito2']);
    this.isCartOpen = false;
  }

  eliminarDetalle(codigoDetalleCarrito: number) {
    this.cartService.eliminarDetalleCarrito(codigoDetalleCarrito);
  }

  filtrarDetalles() {
    if (!this.filtroNombre) {
      this.detallesFiltrados = this.detalles; // Si no hay filtro, muestra todos los detalles.
    } else {
      this.detallesFiltrados = this.detalles.filter(detalle =>
        detalle.producto.nombre!.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }
}
