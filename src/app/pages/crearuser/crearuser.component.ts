import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crearuser',
  templateUrl: './crearuser.component.html',
  styleUrls: ['./crearuser.component.scss']
})
export class CrearuserComponent {

  cliente: Cliente = new Cliente();

  constructor(private toastr: ToastrService,private clienteService: ClientesService, private router: Router) {}

  crear(): void {
    this.clienteService.saveCliente(this.cliente).subscribe(
      response => {
        console.log("Cliente registrado con éxito", response);
        window.alert("Cliente registrado con éxito");
        // Redireccionar a la página de inicio de sesión o a donde prefieras
        this.router.navigate(['pages/login']);
      },
      error => {
        console.error('Error al registrar el cliente', error);
        // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
        window.alert("Error al registrar el cliente");
      }
    );
  }

}
