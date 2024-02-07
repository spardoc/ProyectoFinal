import { Component, OnInit } from '@angular/core';
import { DetalleCarrito } from 'src/app/domain/detalleCarrito';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-carrito2',
  templateUrl: './carrito2.component.html',
  styleUrls: ['./carrito2.component.scss']
})
export class Carrito2Component implements OnInit {

  detalles: DetalleCarrito[] = [];

  constructor(
    private carritoService: CartService,
    private facturaService: FacturasService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // Aquí asumimos que tienes un método en CartService que devuelve los detalles actuales del carrito.
    this.detalles = this.carritoService.getCartItems();
  }

  generarFactura() {
    this.authService.getCarritoCodigo().subscribe(codigoCarrito => {
    if (codigoCarrito) {
      console.log('CODIGO CARRITO PARA GENERAR FACTURA', codigoCarrito)
      this.facturaService.generarFactura(codigoCarrito).subscribe(
        factura => {
          console.log('Factura generada:', factura);
          // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al generar la factura:', error);
          // Manejar errores aquí
        }
      );
    } else {
      console.error('No hay un código de carrito disponible');
      // Manejar el caso de que no haya un código de carrito
    }
  });  
  }
}
