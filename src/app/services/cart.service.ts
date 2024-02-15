import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
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
  private carritoCodigoSource = new BehaviorSubject<number | null>(null);
  carritoCodigo$ = this.carritoCodigoSource.asObservable();
  private carritoCodigo: number | null = null;
  private detalles: DetalleCarrito[] = [];

  private cartVisibleSource = new BehaviorSubject<boolean>(false);
  cartVisible = this.cartVisibleSource.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.carrito = new Carrito();
    this.authService.carritoCodigo$.subscribe(codigo => {
      if (codigo !== null) {
        this.carritoCodigo = codigo; // Ahora asignamos el valor dentro de la suscripción
        this.obtenerCarritoCliente(codigo).subscribe(carrito => {
          this.actualizarCarrito(carrito);
        });
      }
    });
  }

  public agregarAlCarrito(producto: Producto, cantidad: number, talla: string) {
    if (!this.authService.getAuthStatus() || !this.carritoCodigo) {
        console.error('Usuario no autenticado o código de carrito no disponible.');
        return;
    }

    this.agregarProductoAlCarritoBackend(producto, cantidad, talla, this.carritoCodigo).subscribe(codigoDetalle => {
        if (codigoDetalle) {
            // Aquí puedes manejar el código del detalle como sea necesario.
            // Por ejemplo, agregar el producto al carrito con el código del detalle.
            const nuevoDetalle = new DetalleCarrito(producto, cantidad, talla);
            nuevoDetalle.codigo = codigoDetalle; // Asigna el código del detalle recibido
            this.carrito.agregarProductoConDetalle(nuevoDetalle); // Asume que tienes un método para agregar un detalle completo
            this.detalles = [...this.carrito.detalles];
            this.carritoActualizadoSource.next(this.carrito);
        } else {
            console.error('Error en la respuesta del servidor', codigoDetalle);
        }
    }, error => {
        console.error('Error al agregar al carrito', error);
    });
}

  toggleCart() {
    this.cartVisibleSource.next(!this.cartVisibleSource.getValue());
  }

  getCartItems(): DetalleCarrito[] {
    return this.detalles;
  }
  
  private agregarProductoAlCarritoBackend(producto: Producto, cantidad: number, talla: string, carritoCodigo: number): Observable<any> {
    const detalle = { producto: { codigo: producto.codigo }, cantidad: cantidad, talla: talla };
    const url = `${environment.WS_PATH}/carritos/${carritoCodigo}/productos`;

    return this.http.post<any>(url, detalle).pipe(
        map(response => {
            // Asume que la respuesta incluye un campo "codigoDetalle"
            console.log("Codigo Detalle: ",response.codigoDetalle);
            return response.codigoDetalle; // Extrae y devuelve el código del detalle
            
        }),
        catchError(error => {
            console.error('Error al agregar producto al carrito:', error);
            return throwError(() => new Error('Error al agregar producto al carrito.'));
        })
    );
}
  obtenerCarritoCliente(codigoCliente: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${environment.WS_PATH}/carritos/${codigoCliente}/carrito`).pipe(
      tap(carrito => {
        this.actualizarCarrito(carrito); // Llama a actualizarCarrito aquí para establecer los datos del carrito
      })
    );
  }
  
  getCarritoActual(): Carrito {
    return this.carrito;
  }

  public actualizarCarrito(carritoRecuperado: Carrito) {
    this.carrito = new Carrito(); // Reinicia el carrito para asegurar un estado limpio
    
    carritoRecuperado.detalles.forEach(detalle => {
      // Asume que `detalle` ya incluye todos los atributos necesarios, incluyendo un código válido
      const nuevoDetalle = new DetalleCarrito(detalle.producto, detalle.cantidad, detalle.talla);
      nuevoDetalle.codigo = detalle.codigo; // Importante: asegura que el código del detalle se mantiene actualizado
      this.carrito.detalles.push(nuevoDetalle);
    });
  
    // Asegura que el resto del estado del carrito se actualiza adecuadamente
    this.carrito.clienteCodigo = carritoRecuperado.clienteCodigo;
    this.detalles = [...this.carrito.detalles];
    this.carritoActualizadoSource.next(this.carrito); // Notifica a los suscriptores del cambio
  }

  setCarritoCodigo(codigo: number) {
    this.carritoCodigo = codigo;
    this.carritoCodigoSource.next(codigo);
  }

  getCarritoCodigo(): number | null {
    return this.carritoCodigo;
  }

  vaciarCarrito() {
    this.detalles = [];
    this.carrito = new Carrito(); // Reinicia el carrito
    this.carritoActualizadoSource.next(this.carrito); // Notifica a suscriptores
    console.log('Carrito vaciado en CartService');
  }
  
  public eliminarDetalleCarrito(codigoDetalleCarrito: number): void {
    const url = `${environment.WS_PATH}/carritos/borrar/${codigoDetalleCarrito}`;

    this.http.delete<any>(url).subscribe({
      next: () => {
        // Elimina el detalle del carrito localmente
        this.carrito.detalles = this.carrito.detalles.filter(detalle => detalle.codigo !== codigoDetalleCarrito);
        this.carritoActualizadoSource.next(this.carrito);
      },
      error: error => {
        console.error('Error al eliminar el detalle del carrito', error);
      }
    });
  }
  
}