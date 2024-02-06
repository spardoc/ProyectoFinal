import { Injectable } from '@angular/core';
import { environment } from '../environmets/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cliente } from '../domain/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.WS_PATH + '/clientes';
  private isAuthenticated = false;
  private carritoCodigo: number | null = null; // Añade esta línea

  constructor(private http: HttpClient) { }

  iniciarSesion(cliente: Cliente): Observable<any> {
    const params = new HttpParams()
      .set('correo', cliente.correo!)
      .set('clave', cliente.clave!); // Asegurándose de que correo no es undefined
      
    return this.http.get(`${this.apiUrl}/login`, { params });
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
  }

  getCarritoCodigo() {
    return this.carritoCodigo;
  }
}
