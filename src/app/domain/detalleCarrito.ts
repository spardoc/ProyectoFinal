import { Producto } from "./producto";
export class DetalleCarrito {
  codigo?: number;
  producto: Producto;
  cantidad: number;
  talla: string;

  constructor(producto: Producto, cantidad: number, talla: string, codigo?: number) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.talla = talla;
    this.codigo = codigo;
  }
}
