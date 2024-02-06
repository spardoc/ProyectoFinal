import { DetalleCarrito } from "./detalleCarrito";
import { Producto } from "./producto";

export class Carrito {
    detalles: DetalleCarrito[] = [];
    clienteCodigo?: number;

    agregarProducto(producto: Producto, cantidad: number) {
        // Asegurarse de que el producto no es undefined
        if (!producto) return;

        const detalleExistente = this.detalles.find(detalle => detalle.producto.codigo === producto.codigo);
        if (detalleExistente && detalleExistente.cantidad !== undefined) {
            detalleExistente.cantidad += cantidad;
        } else {
            this.detalles.push(new DetalleCarrito(producto, cantidad));
        }
    }

    removerProducto(codigoProducto: number) {
        this.detalles = this.detalles.filter(detalle => detalle.producto.codigo !== codigoProducto);
    }
}



