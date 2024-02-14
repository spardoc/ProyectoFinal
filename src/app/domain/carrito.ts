import { DetalleCarrito } from "./detalleCarrito";
import { Producto } from "./producto";

export class Carrito {
    detalles: DetalleCarrito[] = [];
    clienteCodigo?: number;

    agregarProductoConDetalle(detalle: DetalleCarrito) {
        // Asume que el detalle ya incluye el código y la talla
        const indiceExistente = this.detalles.findIndex(d => d.producto.codigo === detalle.producto.codigo && d.talla === detalle.talla);

        if (indiceExistente !== -1) {
            // Si el detalle ya existe, solo actualiza la cantidad
            this.detalles[indiceExistente].cantidad += detalle.cantidad;
        } else {
            // Si es un nuevo detalle, lo agrega al array de detalles
            this.detalles.push(detalle);
        }
    }

    removerProducto(codigoDetalle: number) {
        // Ajusta este método para que use el código del detalle para eliminar
        this.detalles = this.detalles.filter(detalle => detalle.codigo !== codigoDetalle);
    }
}
