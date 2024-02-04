import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Producto } from '../domain/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Producto[] = [];

  constructor(private authService: AuthService) {}

  agregarAlCarrito(producto: Producto) {
    if (this.authService.getAuthStatus()) {
      this.items.push(producto);
      // Aquí podrías emitir un evento o realizar otra lógica necesaria
    } else {
      // Si no está autenticado, manejar ese caso (p.ej., mostrando un mensaje)
    }
  }
  private cartVisibleSource = new BehaviorSubject<boolean>(false);
  cartVisible = this.cartVisibleSource.asObservable();

  toggleCart() {
    this.cartVisibleSource.next(!this.cartVisibleSource.getValue());
  }

  getCartItems(): Producto[] {
    return this.items;
  }
}
