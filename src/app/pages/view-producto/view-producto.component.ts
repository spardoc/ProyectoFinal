import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/domain/producto';
import { CartService } from 'src/app/services/cart.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-view-producto',
  templateUrl: './view-producto.component.html',
  styleUrls: ['./view-producto.component.scss']
})
export class ViewProductoComponent implements OnInit {
  cantidad: number = 1;
  codigoProducto: number = 0; // Inicializar con un valor por defecto
  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const codigoParam = params.get('codigo');
      
      if (codigoParam !== null) {
        // Convierte el valor del parámetro 'codigo' a un número
        this.codigoProducto = +codigoParam;
        
        // Llama al servicio para obtener los detalles del producto solo con el código
        this.productosService.getProductoPorCodigoYNombre(this.codigoProducto, '').subscribe(producto => {
          this.producto = producto;
        });
      } else {
        // Manejar el caso en el que 'codigo' es nulo (por ejemplo, mostrar un mensaje de error)
      }
    });
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
    if (cantidad <= 0) {
      window.alert("La cantidad debe ser mayor a 0");
      return;
    }
    this.cartService.agregarAlCarrito(producto, cantidad); // Asegúrate de que CartService maneje la cantidad
    window.alert("Producto agregado al carrito");
  }
}
