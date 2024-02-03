import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent {
  pagoForm = new FormGroup({
    tipoTarjeta: new FormControl('credito', Validators.required),
    numeroTarjeta: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    nombreTarjeta: new FormControl('', Validators.required),
    fechaVencimiento: new FormGroup({
      mesVencimiento: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
      anoVencimiento: new FormControl('', [Validators.required, Validators.min(0)]),
    }),
    codigoSeguridad: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]),
    cedulaPagador: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    cuotas: new FormControl('', Validators.required),
  });

  onSubmit() {
    // Aquí manejas la lógica de envío de datos
    console.log(this.pagoForm.value);
  }

}
