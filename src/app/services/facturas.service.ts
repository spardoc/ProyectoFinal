import { Injectable } from '@angular/core';
import { environment } from '../environmets/environments';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../domain/factura';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private apiUrl = environment.WS_PATH + '/facturas';
  
  constructor(private http: HttpClient) { }

  generarFactura(codigoCarrito: number): Observable<Factura> {
    return this.http.post<Factura>(`${this.apiUrl}/generar/${codigoCarrito}`, {});
  }
}
