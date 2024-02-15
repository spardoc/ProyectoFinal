import { Injectable } from '@angular/core';
import { environment } from '../environmets/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cliente } from '../domain/cliente';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private carritoCodigoSource = new BehaviorSubject<number | null>(null);
  carritoCodigo$ = this.carritoCodigoSource.asObservable();

  // Esta variable almacena el último valor conocido del código del carrito.
  private carritoCodigo: number | null = null;
  private apiUrl = environment.WS_PATH + '/clientes';
  private isAuthenticated = false;
  private codigoCliente: number | null = null;

  constructor(private http: HttpClient) {
  }
  

  iniciarSesion(cliente: Cliente): Observable<any> {
    const params = new HttpParams()
      .set('correo', cliente.correo!)
      .set('clave', cliente.clave!);

      return this.http.get(`${this.apiUrl}/login`, { params }).pipe(
        tap((response: any) => {
          if (response.codigoCarrito) {
            this.setCarritoCodigo(response.codigoCarrito);
          }
          // Asegúrate de manejar también el código del cliente
          if (response.codigoCliente) {
            this.setCodigoCliente(response.codigoCliente);
          }
        })
      );
  }
  
  cerrarSesion(): void {
    console.log('Cerrando sesión en AuthService');
    this.isAuthenticated = false;
    this.carritoCodigoSource.next(null);
    // Considera resetear también el codigoCliente si es necesario
    this.codigoCliente = null;
    // Notificar a suscriptores sobre el cambio de autenticación, si tienes un observable para ello
  }
  

  private obtenerCarritoCliente(codigoCliente: number): Observable<any> {
    return this.http.get<any>(`${environment.WS_PATH}/carritos/${codigoCliente}/carrito`);
  }

  // Método para actualizar el estado de autenticación
  setAuthStatus(authenticated: boolean) {
    this.isAuthenticated = authenticated;
  }

  // Método para verificar el estado de autenticación
  getAuthStatus() {
    return this.isAuthenticated;
  }

  setCarritoCodigo(codigo: number) {
    this.carritoCodigo = codigo;
    this.carritoCodigoSource.next(codigo);
  }

  public getCarritoCodigo(): Observable<number | null> {
    return this.carritoCodigo$;
  }

  getCodigoCliente() {
    return this.codigoCliente;
  }

  private setCodigoCliente(codigo: number) {
    this.codigoCliente = codigo;
  }

  getCarritoCodigoSincrono(): number | null {
    return this.carritoCodigo;
  }
}
