import { Factura } from "./factura";
import { Producto } from "./producto";

export class DetalleFactura {
    codigo?: number;
    producto ?: string;
    cantidad?: number;
    precio?: number;
    iva?: number;
    factura?: Factura;
    productos: Producto[] = []; 
}