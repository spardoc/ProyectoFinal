import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/domain/producto';

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

  constructor() {
    // Puedes inicializar 'products' aquí si no se llena desde un servicio
    this.products = [
      {
        codigo: 1,
        nombre: 'Camiseta de rayas',
        precio: 20,
        categoria: 'men',
        img: 'https://www.etafashion.com/medias/5000000916476-900x1200-0.jpg?context=bWFzdGVyfGltYWdlc3w0MTk3MDN8aW1hZ2UvanBlZ3xhR0U1TDJnd05DOHlPRFk1T0RVek5EWTBNVFk1TkM4MU1EQXdNREF3T1RFMk5EYzJMVGt3TUhneE1qQXdYekF1YW5CbnwzYTJkMDgxZTNiZDQ1Nzk1ODU3MDI3OWVkZGIwYThiYTYwMjgzZDFkMWM4ODQyZDk5MGFkNGM0OGY5Mjk5MWVl' // Asegúrate de que esta sea la ruta correcta a la imagen
      },
      {
        codigo: 2,
        nombre: 'Camiseta con motivo estampado',
        precio: 20,
        categoria: 'men',
        img: 'https://images.deprati.com.ec/sys-master/images/hd7/h2d/11717335842846/16937855-0_product_1200Wx1800H' // Asegúrate de que esta sea la ruta correcta a la imagen
      },
      {
        codigo: 3,
        nombre: 'Camiseta con motivo estampado',
        precio: 20,
        categoria: 'men',
        img: 'data:image/jpeg;base64,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' // Asegúrate de que esta sea la ruta correcta a la imagen
      },
      {
        codigo: 4,
        nombre: 'Camiseta con motivo estampado',
        precio: 20,
        categoria: 'women',
        img: 'https://lucattistore.com/wp-content/uploads/2021/08/Camiseta-con-estampado-de-bolsillo-Montanita-mujer.jpg' // Asegúrate de que esta sea la ruta correcta a la imagen
      },
      {
        codigo: 5,
        nombre: 'Camiseta con motivo estampado',
        precio: 20,
        categoria: 'women',
        img: 'https://i.pinimg.com/736x/ce/4c/e9/ce4ce9824af0b548d703b31bdbdc75b4.jpg' // Asegúrate de que esta sea la ruta correcta a la imagen
      },
      {
        codigo: 6,
        nombre: 'Camiseta con motivo estampado',
        precio: 20,
        categoria: 'women',
        img: 'https://i.ebayimg.com/images/g/seEAAOSwPHdkB5xS/s-l1200.webp' // Asegúrate de que esta sea la ruta correcta a la imagen
      },
    ];
  }

  ngOnInit(): void {
    // Asegúrate de que 'products' se haya llenado antes de filtrar
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
