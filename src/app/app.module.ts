import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { Carrito2Component } from './pages/carrito2/carrito2.component';
import { Carrito3Component } from './pages/carrito3/carrito3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagoComponent } from './pages/pago/pago.component';
import { CartSidebarComponent } from './pages/cart-sidebar/cart-sidebar.component';
import { CrearuserComponent } from './pages/crearuser/crearuser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CarritoComponent,
    Carrito2Component,
    Carrito3Component,
    PagoComponent,
    CartSidebarComponent,
    CrearuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
