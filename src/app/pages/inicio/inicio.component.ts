import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/domain/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  products: Producto[]; // Asegúrate de inicializar 'products' si no se llena desde un servicio
  menProducts: Producto[] = [];
  womenProducts: Producto[] = [];
  showMenSection = true;
  showWomenSection = true;

  constructor(private productosService: ProductosService) { }

ngOnInit(): void {
  this.products = this.productosService.getProducts();
  this.filterProductsByGender();
}

  filterProductsByGender() {
    this.menProducts = this.products.filter(p => p.categoria === 'men');
    this.womenProducts = this.products.filter(p => p.categoria === 'women');
  }
  
  showMen() {
    this.showMenSection = true;
    this.showWomenSection = false;
  }

  showWomen() {
    this.showMenSection = false;
    this.showWomenSection = true;
  }

  showBoth() {
    this.showMenSection = true;
    this.showWomenSection = true;
  }
}
