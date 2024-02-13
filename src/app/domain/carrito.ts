import { DetalleCarrito } from "./detalleCarrito";
import { Producto } from "./producto";

export class Carrito {
    detalles: DetalleCarrito[] = [];
    clienteCodigo?: number;

    agregarProducto(producto: Producto, cantidad: number, talla: string) {
        if (!producto) return;

        // Busca un detalle existente que coincida tanto en código de producto como en talla
        const detalleExistente = this.detalles.find(detalle => detalle.producto.codigo === producto.codigo && detalle.talla === talla);
        
        if (detalleExistente) {
            detalleExistente.cantidad += cantidad;
        } else {
            this.detalles.push(new DetalleCarrito(producto, cantidad, talla));
        }
    }

    removerProducto(codigoProducto: number) {
        this.detalles = this.detalles.filter(detalle => detalle.producto.codigo !== codigoProducto);
    }
}