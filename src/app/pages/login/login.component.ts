import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  cliente: Cliente = { correo: '', clave: '' };

  constructor(private authService: AuthService) { }

  iniciarSesion(): void {
    this.authService.iniciarSesion(this.cliente).subscribe(
      response => {
        // Actualiza el estado de autenticación
        this.authService.setAuthStatus(true);
        console.log("Inicio de sesión correcto")
        // Posiblemente redirigir al usuario al dashboard o a la página de productos
      },
      error => {
        console.error('Error al iniciar sesión', error);
        // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }
}
