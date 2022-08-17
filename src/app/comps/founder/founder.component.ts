import { Component, OnInit } from '@angular/core';
import { OperationsService } from "../operations.service";
import { Order } from "../order.model";
import { Product } from "../product.model";

@Component({
  selector: 'app-founder',
  templateUrl: './founder.component.html',
  styleUrls: ['./founder.component.scss']
})
export class FounderComponent implements OnInit {
  // TODO: make founder happy! he's only concerned with "earnings", then
  //   1. ditch `products`; boutique component can get it's products from store
  //   2. ditch `orders`; buyer component knows best how to get its data
  //   3. yep, all founder needs to be concerned with is `earnings$` for growth n'all;
  //      what's needed is a selector that "binds" store's `earnings$` to the one here
  //      - NOTE: better to make `earnings` below become `earnings$`

  products!: Product[];
  orders!: Order[];
  earnings: number = 0

  constructor(private store: OperationsService) { }

  ngOnInit(): void {
    this.products = this.store.products;
  }

  collectOrder(orders: Order[]) {
    this.orders = orders;
  }

  receivePayment(newPayment: number) {
    this.earnings += newPayment;
    this.store.updateSales(this.orders);
    const products = this.products;
    this.products = [];
    setTimeout(() => {
      this.products = products;
    })
  }
}
