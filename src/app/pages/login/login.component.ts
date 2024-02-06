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

  constructor(private authService: AuthService, private router: Router) { }

  iniciarSesion(): void {
    this.authService.iniciarSesion(this.cliente).subscribe(
      response => {
        if (response.mensaje === 'Acceso concedido') {
          // Autenticación exitosa
          this.authService.setAuthStatus(true);
          console.log("Inicio de sesión correcto");

          // Obtén el código del carrito desde el AuthService
          const codigoCarrito = this.authService.getCarritoCodigo();

          // Realiza acciones con el código del carrito, si es necesario
          console.log("Código del carrito:", codigoCarrito);

          // Redirigir al usuario al dashboard o a la página de productos
          window.alert("Inicio de sesión correcto");
          this.router.navigate(['pages/inicio']);
        } else {
          // Manejar el caso de autenticación fallida
          console.error('Error al iniciar sesión: Correo o contraseña incorrecta');
          window.alert("Correo o contraseña incorrecta");
        }
      },
      error => {
        console.error('Error al iniciar sesión', error);
        // Manejar el error aquí
        window.alert("Error al iniciar sesión");
      }
    );
  }

  registrarse(): void {
    this.router.navigate(['/pages/crearuser']); // Asegúrate de que esta ruta corresponda a tu ruta de registro
  }
}
