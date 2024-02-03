import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private router: Router) {}

  crear(): void {
    
    
    this.router.navigate(['pages/crearuser']); // Asegúrate de que '/checkout' sea la ruta correcta
  }

}
