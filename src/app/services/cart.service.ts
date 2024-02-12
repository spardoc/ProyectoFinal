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

  public agregarAlCarrito(producto: Producto, cantidad: number) {
    // Comprobar primero si el usuario está autenticado y si hay un código de carrito disponible.
    if (!this.authService.getAuthStatus() || !this.carritoCodigo) {
      console.error('Usuario no autenticado o código de carrito no disponible.');
      
      return;
    }
  
    // Ya que estás seguro de que hay un código de carrito, puedes proceder a agregar el producto al carrito.
    this.agregarProductoAlCarritoBackend(producto, cantidad, this.carritoCodigo).subscribe(response => {
      if (response.mensaje === 'Producto agregado al carrito') {
        this.carrito.agregarProducto(producto, cantidad);
        this.detalles = [...this.carrito.detalles];
        this.carritoActualizadoSource.next(this.carrito);
      } else {
        console.error('Error en la respuesta del servidor', response);
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
  

  private agregarProductoAlCarritoBackend(producto: Producto, cantidad: number, carritoCodigo: number): Observable<any> {
    const detalle = { producto: { codigo: producto.codigo }, cantidad: cantidad };
    const url = `${environment.WS_PATH}/carritos/${carritoCodigo}/productos`;
    return this.http.post(url, detalle);
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
    console.log('Llamando a actualizar carrito')
    if (carritoRecuperado) {
        // Reinicializar el carrito con los detalles recuperados
        this.carrito = new Carrito();
        carritoRecuperado.detalles
            .filter(detalle => detalle.producto) // Filtrar los detalles que tienen un producto definido
            .forEach(detalle => {
                if (detalle.producto && detalle.cantidad) {
                    this.carrito.agregarProducto(detalle.producto, detalle.cantidad);
                }
            });

        // Actualizar el código del cliente
        this.carrito.clienteCodigo = carritoRecuperado.clienteCodigo;

        // Actualizar la lista de detalles en base al carrito actualizado
        this.detalles = [...this.carrito.detalles];

        // Notificar a los suscriptores
        this.carritoActualizadoSource.next(this.carrito);
    } else {
        console.log('ERROR AL RECUPERAR CARRITO');
    }
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
  
  
}