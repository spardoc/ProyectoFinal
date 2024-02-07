import { Component, OnInit } from '@angular/core';
import { DetalleCarrito } from 'src/app/domain/detalleCarrito';
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
    private facturaService: FacturasService
  ) { }

  ngOnInit(): void {
    // Aquí asumimos que tienes un método en CartService que devuelve los detalles actuales del carrito.
    this.detalles = this.carritoService.getCartItems();
  }

  generarFactura() {
    const codigoCarrito = this.carritoService.getCarritoCodigo(); // Asegúrate de tener este método en CarritoService
    if (codigoCarrito) {
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
  }

  
}
