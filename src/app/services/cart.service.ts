import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Producto } from '../domain/producto';
import { environment } from '../environmets/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carritoCodigo: number | null = null;

  private items: Producto[] = [];

  private cartVisibleSource = new BehaviorSubject<boolean>(false);
  cartVisible = this.cartVisibleSource.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {}

  agregarAlCarrito(producto: Producto, cantidad: number) {
    if (this.authService.getAuthStatus()) {
      // Aquí se debe llamar al backend para sincronizar el carrito
      this.agregarProductoAlCarritoBackend(producto, cantidad).subscribe(response => {
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

  private agregarProductoAlCarritoBackend(producto: Producto, cantidad: number): Observable<any> {
    const carritoCodigo = this.authService.getCarritoCodigo();
    const detalle = { producto: { codigo: producto.codigo }, cantidad };
    if (carritoCodigo) {
      const detalle = { producto: { codigo: producto.codigo }, cantidad: 1 };
      const url = `${environment.WS_PATH}/carritos/${carritoCodigo}/productos`;
      return this.http.post(url, detalle);
    } else {
      console.error('No se ha obtenido un código de carrito válido.');
      return throwError('No se ha obtenido un código de carrito válido.');
    }
  }
  
}