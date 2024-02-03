import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/domain/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-view-producto',
  templateUrl: './view-producto.component.html',
  styleUrls: ['./view-producto.component.scss']
})
export class ViewProductoComponent {

  constructor(private route: ActivatedRoute, private productosService: ProductosService) { }

  
}
