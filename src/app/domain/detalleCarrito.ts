import { Producto } from "./producto";
export class DetalleCarrito {
  producto: Producto;
  cantidad: number;
  talla: string;

  constructor(producto: Producto, cantidad: number, talla: string) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.talla = talla;
  }
}
