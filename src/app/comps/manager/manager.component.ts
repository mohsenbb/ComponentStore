import { Component, OnInit } from '@angular/core';
import { OperationsService } from "../operations.service";
import { Order } from "../order.model";
import { Product } from "../product.model";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  products!: Product[];
  orders!: Order[];
  earnings: number = 0

  constructor(private store: OperationsService) { }

  ngOnInit(): void {
    this.store.subjectProduct.subscribe(products => {
      this.products = [...products];
    })
  }

  collectOrder(orders: Order[]) {
    this.orders = orders;
  }

  receivePayment(newPayment: number) {
    this.earnings += newPayment;
    this.store.updateSales(this.orders);
  }
}
