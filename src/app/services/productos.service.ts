import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}