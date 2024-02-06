import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Producto } from '../domain/producto';
import { environment } from '../environmets/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Producto[] = [];

  private cartVisibleSource = new BehaviorSubject<boolean>(false);
  cartVisible = this.cartVisibleSource.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {}

  agregarAlCarrito(producto: Producto) {
    if (this.authService.getAuthStatus()) {
      // Aquí se debe llamar al backend para sincronizar el carrito
      this.agregarProductoAlCarritoBackend(producto).subscribe(response => {
        // Manejar la respuesta del backend
        this.items.push(producto);
        // Aquí podrías emitir un evento o realizar otra lógica necesaria
      });
    } else {
      // Si no está autenticado, manejar ese caso (p.ej., mostrando un mensaje)
    }
  }

  toggleCart() {
    this.cartVisibleSource.next(!this.cartVisibleSource.getValue());
  }

  getCartItems(): Producto[] {
    return this.items;
  }

  private agregarProductoAlCarritoBackend(producto: Producto): Observable<any> {
    const detalle = { producto: { codigo: producto.codigo }, cantidad: 1 }; // Asumiendo cantidad 1 por defecto
    return this.http.post(`${environment.WS_PATH}/carritos/[codigoCarrito]/productos`, detalle);
  }
}