import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/domain/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  menProducts: Producto[] = [];
  womenProducts: Producto[] = [];
  showMenSection = true;
  showWomenSection = true;

  constructor(private productosService: ProductosService) { }

ngOnInit(): void {
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
