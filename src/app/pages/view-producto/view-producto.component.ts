import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/domain/producto';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-view-producto',
  templateUrl: './view-producto.component.html',
  styleUrls: ['./view-producto.component.scss']
})
export class ViewProductoComponent implements OnInit {
  cantidad: number = 1;
  cantidadClase = 'cantidad';
  codigoProducto: number = 0; // Inicializar con un valor por defecto
  producto: any;
  talla: string = 'M';

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
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

  agregarAlCarrito(producto: Producto, cantidad: number, talla: string) {
    if (cantidad <= 0) {
      window.alert("La cantidad debe ser mayor a 0");
      return;
    }
    else
    {
      if (this.authService.getAuthStatus() == false) {
        // Redirige al cliente a la página de inicio de sesión si no ha iniciado sesión
        this.router.navigate(['/pages/login']); // Asegúrate de que la ruta coincida con la configuración de tu enrutamiento
        window.alert("Por favor, inicia sesión para agregar productos al carrito");
      }
      else {
        this.cartService.agregarAlCarrito(producto, cantidad, talla);
        window.alert("Producto agregado al carrito con talla: " + talla);
        this.router.navigate(['/pages/inicio']);
      }
    }
  }

  aumentarCantidad() {
    this.cantidad++;
    this.cantidadClase = 'cantidad cantidad-aumenta';

    setTimeout(() => {
      this.cantidadClase = 'cantidad';
    }, 500); // tiempo igual a la duración de la animación
  }

  disminuirCantidad() {
    this.cantidad--;
    this.cantidadClase = 'cantidad cantidad-aumenta';

    setTimeout(() => {
      this.cantidadClase = 'cantidad';
    }, 500); // tiempo igual a la duración de la animación
  }
}
