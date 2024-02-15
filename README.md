# ProyectoFinal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Nombre del Proyecto
Proyecto Final web de compras

## Descripción
una web de sompras implementando angular como fronted y de backend uso de eclipse asi como
de base de datos mysql

## Características
-registro y auntentificacion de usuarios
-busquedas de productos
-Carrito de compras
-detalles de factura
-facturas
-chat de whatsapp
-adicion y eliminacion de productos
## Tecnologías Utilizadas
-Fronted angular 
-Backend uso de Eclipse Java Development Tools (JDT)
-Base de datos mysql

## Requisitos Previos
instalar las librerias necesarias de angular

## Cómo Empezar
crear base de datos mysql, y encender el servidor de wildfly, posteriormente dar un ng serve -o o un firebase deploy

## Estructura del Proyecto
toda la parte logica asi como los servicios de Métodos HTTP en Servicios Web y APIs RESTful estan en el backend
y la parte grafica tanto funcional como de diseño esta en el fronted

## Documentación de API
Métodos HTTP en Servicios Web y APIs RESTful

GET: Se utiliza para solicitar datos de un recurso especificado. GET es el método más común y se usa para obtener datos sin afectarlos.
estos metodos los utilzamos para el llamdo clientes,productos,detalles de factura y para obtener la factura

POST: Se emplea para enviar datos a un servidor para crear o actualizar un recurso. Los datos enviados al servidor con el método POST se almacenan en el cuerpo de la solicitud HTTP.
Estos metodos los utilizamos para  creacion de nuevos usuarios, carritos, detalles de facturas y la misma factura

PUT: Utilizado para actualizar un recurso existente o crear un nuevo recurso si no existe en el servidor. A diferencia de POST, PUT es idempotente, lo que significa que realizar la misma solicitud varias veces produce el mismo resultado que hacerlo una sola vez.
lo utilizamos en creacion del carrito y tambien en añadido de nuevos productos al carrito

DELETE: Se usa para eliminar un recurso especificado.
a la hora de vaciar el carrito quitamos los productos respectivos.

## Contacto y Soporte

jsalazarc10@est.ups.edu.ec
spardoc@est.ups.edu.ec