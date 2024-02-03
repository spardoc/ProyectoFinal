import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent implements OnInit{
  cartOpen: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartVisible.subscribe(visible => {
      this.cartOpen = visible;
    });
  }
  

  closeCart() {
    this.cartService.toggleCart();
  }

  toggleCart() {
    this.cartService.toggleCart();
  

}
}
