import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { direcciones } from 'src/app/Domain/direcciones';

@Component({
  selector: 'app-carrito3',
  templateUrl: './carrito3.component.html',
  styleUrls: ['./carrito3.component.scss']
})
export class Carrito3Component implements OnInit {
  direccionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.direccionForm = this.fb.group(new direcciones());
  }

  ngOnInit(): void {}

  guardarDireccion() {
    const direccion = this.direccionForm.value as direcciones;
    // Aquí puedes realizar acciones como enviar la dirección al servidor o guardarla localmente.
    console.log('Dirección guardada:', direccion);
  }

  

}
