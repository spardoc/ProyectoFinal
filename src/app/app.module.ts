import { NgModule, isDevMode } from '@angular/core';
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
import { ViewProductoComponent } from './pages/view-producto/view-producto.component';

import {HttpClientModule} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker'; // CONSULTAS SQL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

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
    CrearuserComponent,
    ViewProductoComponent
  ],
  imports: [
    AngularFirestoreModule.enablePersistence(),
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // agregar esto
    ToastrModule.forRoot(), // ToastrModule añadido
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
