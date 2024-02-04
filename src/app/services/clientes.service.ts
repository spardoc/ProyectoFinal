import { Injectable } from '@angular/core';
import { environment } from '../environmets/environments';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../domain/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = environment.WS_PATH + '/clientes';

  constructor(private http: HttpClient) { }

  saveCliente(cliente: Cliente){
    let url = environment.WS_PATH + "/clientes"
    return this.http.post<any>(url, cliente)
  }
}
