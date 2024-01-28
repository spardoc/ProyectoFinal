import { Cliente } from "./cliente";
import { DetalleFactura } from "./detalleFactura";

export class Factura {
    codigo?: number;
    numero?: number;
    fechaEmision ?: string;
    total?: number;
    detalles: DetalleFactura[] = []; 
    cliente: Cliente = new Cliente();
}