import { Injectable } from '@angular/core';
import { Product, updateSoldProperty } from './product.model';
import { BehaviorSubject } from "rxjs";
import { Order } from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  products: Product[] = [
    {id: 10, sold: 0, name: 'Beach ball', cost: 14},
    {id: 20, sold: 0, name: 'Towel', cost: 5},
    {id: 30, sold: 0, name: 'Frisbee', cost: 2},
    {id: 40, sold: 0, name: 'Sunscreen', cost: 4},
    {id: 50, sold: 0, name: 'Cooler', cost: 25},
    {id: 60, sold: 0, name: 'Swim suit', cost: 15}
  ];

  constructor() {
  }

  updateSales(orders: Order[]) {
    updateSoldProperty(this.products, orders);
  }

  // TODO: create a `makePayment()` method that does this:
  //   1. use rxjs's zip() on `earnings$` and `this.paymentDue$`
  //   2. patchState of `earnings` by adding zip's observables
  //   we can now:
  //   3. patchState of `paymentDue` to zero now
  //   4. patchState of `orders` to []
  //   5. call the `updateSales()` method

  // TODO: create an `updateSales() method that does this:
  //   1. subscribe to `products$` to fetch `products`
  //   2. use `updateSoldProperty()` to update data
  //      parameters? (products, [...this.ordersMap.values()])
  //   3. we're done with `orderMap`, clear it
  //   4. update `productsUpdate` method update the state of `products`
  //   5. inform subscribers of `emitPaymentProcessed` that we're done
}
