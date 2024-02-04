import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../domain/producto';
import { environment } from '../environmets/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos() {
    let url = environment.WS_PATH + "/productos/list"
    return this.http.get<any>(url)
  }

  getProductoPorCodigoYNombre(codigo: number, nombre: string) {
    let url = environment.WS_PATH + '/productos';

    // Crear parámetros de consulta
    const params = new HttpParams()
      .set('codigo', codigo.toString())
      .set('nombre', nombre);

    return this.http.get<Producto>(url, { params });
  }
}