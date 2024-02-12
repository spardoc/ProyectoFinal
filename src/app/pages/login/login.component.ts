import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { DetalleCarrito } from 'src/app/domain/detalleCarrito';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  cliente: Cliente = { correo: '', clave: '' };

  detalles: DetalleCarrito[] = [];


  constructor(public authService: AuthService, private router: Router, private cartService: CartService) 
  {
    this.detalles = this.cartService.getCartItems();
  }

  iniciarSesion(): void {
    this.authService.iniciarSesion(this.cliente).subscribe(
      response => {
        if (response.mensaje === 'Acceso concedido') {
          // Autenticación exitosa
          this.authService.setAuthStatus(true);
          console.log("Inicio de sesión correcto");
          this.router.navigate(['/pages/inicio']);
          // Si se proporciona el código del carrito en la respuesta, úsalo
          const codigoCarrito = response.codigoCarrito;
          if (codigoCarrito) {
            this.authService.setCarritoCodigo(codigoCarrito);
            console.log("Código del carrito:", codigoCarrito);
  
            // Obtener el carrito del cliente
            this.cartService.obtenerCarritoCliente(codigoCarrito).subscribe(
              carrito => {
                // Actualizar el estado del carrito en el frontend
                // ...lógica para manejar el carrito...
                console.log('Carrito recuperado:', carrito);
                this.cartService.actualizarCarrito(carrito);
              },
              error => console.error('Error al obtener el carrito', error)
            );
          } else {
            console.warn('Código del carrito no disponible en la respuesta de autenticación.');
          }
  
          // Redirigir al usuario al dashboard o a la página de productos
          //this.router.navigate(['pages/inicio']);
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

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.cartService.vaciarCarrito(); // Asegúrate de llamar a vaciarCarrito aquí
    this.router.navigate(['/pages/inicio']); // O la ruta que tengas para la página de inicio de sesión
  }
  
}
