import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleCarrito } from 'src/app/domain/detalleCarrito';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FacturasService } from 'src/app/services/facturas.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    // Aquí asumimos que tienes un método en CartService que devuelve los detalles actuales del carrito.
    this.detalles = this.carritoService.getCartItems();
  }

  generarFactura() {
    const codigoCarrito = this.authService.getCarritoCodigoSincrono(); // Suponiendo que este método ahora devuelve un valor directamente
    
    if (codigoCarrito) {
      console.log('CODIGO CARRITO PARA GENERAR FACTURA', codigoCarrito);
      this.facturaService.generarFactura(codigoCarrito).subscribe(
        factura => {
          console.log('Factura generada:', factura);
          this.carritoService.vaciarCarrito(); // Vacía el carrito después de generar la factura
          this.detalles = []; // Actualiza la vista para reflejar el carrito vacío
          this.router.navigate(['pages/inicio']);
        },
        error => {
          console.error('Error al generar la factura:', error);
        }
      );
    } else {
      console.error('No hay un código de carrito disponible');
    }

    
  }

  getTotalConIVA(): number {
    return this.detalles.reduce((total, detalle) => {
      const subtotal = (detalle.cantidad || 0) * (detalle.producto?.precio || 0);
      const totalConIVA = subtotal * 1.12; // Asume un IVA del 12%
      return total + totalConIVA;
    }, 0);
  }

  
  
  
}
