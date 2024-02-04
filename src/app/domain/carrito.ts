import { Producto } from "./producto";

export class Carrito {
    items: { producto: Producto; cantidad: number }[] = [];
    codigoCliente?: number;

    agregarProducto(producto: Producto, cantidad: number) {
        const itemExistente = this.items.find(item => item.producto.codigo === producto.codigo);
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.items.push({ producto, cantidad });
        }
    }

    removerProducto(codigoProducto: number) {
        this.items = this.items.filter(item => item.producto.codigo !== codigoProducto);
    }
}

