import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Producto } from '../domain/producto';
import { environment } from '../environmets/environments';
import { DetalleCarrito } from '../domain/detalleCarrito';
import { Carrito } from '../domain/carrito';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private carritoActualizadoSource = new BehaviorSubject<Carrito | null>(null);
  carritoActualizado$ = this.carritoActualizadoSource.asObservable();

  private carrito!: Carrito;
  private carritoCodigo: number | null = null;

  private detalles: DetalleCarrito[] = [];

  private cartVisibleSource = new BehaviorSubject<boolean>(false);
  cartVisible = this.cartVisibleSource.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {
    // Suscribirse al BehaviorSubject para actualizar el carrito cuando el usuario inicie sesión
    this.authService.carritoCodigo$.subscribe(codigo => {
      if (codigo) {
        this.obtenerCarritoCliente(codigo).subscribe(carrito => {
          this.actualizarCarrito(carrito);
        });
      }
    });
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
    const carritoCodigo = this.authService.getCarritoCodigo();
    if (this.authService.getAuthStatus() && carritoCodigo) {
      this.agregarProductoAlCarritoBackend(producto, cantidad, carritoCodigo).subscribe(response => {
          if (response.mensaje === 'Producto agregado al carrito') {
              this.detalles.push({ producto: producto, cantidad: cantidad });
          } else {
              console.error('Error en la respuesta del servidor', response);
          }
      }, error => {
          console.error('Error al agregar al carrito', error);
      });
    } else {
      console.error('Usuario no autenticado o código de carrito no disponible.');
    }
  }

  toggleCart() {
    this.cartVisibleSource.next(!this.cartVisibleSource.getValue());
  }

  getCartItems(): DetalleCarrito[] {
    return this.detalles;
  }
  

  private agregarProductoAlCarritoBackend(producto: Producto, cantidad: number, carritoCodigo: number): Observable<any> {
    const detalle = { producto: { codigo: producto.codigo }, cantidad: cantidad };
    const url = `${environment.WS_PATH}/carritos/${carritoCodigo}/productos`;
    return this.http.post(url, detalle);
  }
  

  obtenerCarritoCliente(codigoCliente: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${environment.WS_PATH}/carritos/${codigoCliente}/carrito`).pipe(
      tap(carrito => {
        this.actualizarCarrito(carrito); // Llama a actualizarCarrito aquí para establecer los datos del carrito
        console.log(carrito.detalles)

      })
    );
  }
  
  getCarritoActual(): Carrito {
    return this.carrito;
  }

  public actualizarCarrito(carritoRecuperado: Carrito) {
    if (carritoRecuperado) {
      // Obtener los items del carrito
      const detalles = carritoRecuperado.detalles || [];
  
      // Obtener el código del cliente
      const clienteCodigo = carritoRecuperado.clienteCodigo;
  
      // Actualizar el carrito y los items según sea necesario
      this.carrito = carritoRecuperado;
      this.detalles = JSON.parse(JSON.stringify(detalles));
      
      // Emitir un evento para que los componentes sepan que el carrito ha sido actualizado
      this.carritoActualizadoSource.next(this.carrito);
  
      // Puedes realizar acciones adicionales aquí si es necesario
      // Por ejemplo, almacenar el código del cliente en una propiedad del servicio
      if (clienteCodigo !== undefined) {
        this.carritoCodigo = clienteCodigo;
      } else {
        this.carritoCodigo = null; // Otra opción es asignar null si es undefined
      }
    } else {
      console.log('ERROR AL RECUPERAR CARRITO');
    }
  }
  
  
  
  
  
}