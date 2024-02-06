import { Producto } from "./producto";

export class Carrito {
    detalles: { producto: Producto; cantidad: number }[] = [];
    clienteCodigo?: number;

    agregarProducto(producto: Producto, cantidad: number) {
        const detalleExistente = this.detalles.find(detalle => detalle.producto.codigo === producto.codigo);
        if (detalleExistente) {
            detalleExistente.cantidad += cantidad;
        } else {
            this.detalles.push({ producto, cantidad });
        }
    }

    removerProducto(codigoProducto: number) {
        this.detalles = this.detalles.filter(detalle => detalle.producto.codigo !== codigoProducto);
    }
}

