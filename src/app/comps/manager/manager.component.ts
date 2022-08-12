import { Component, OnInit } from '@angular/core';
import { OperationsService } from "../operations.service";
import { Order } from "../order.model";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  products: any;
  orders!: Order[];
  profit: number = 0

  constructor(private service: OperationsService) { }

  ngOnInit(): void {
    this.service.subjectProduct.subscribe(products => {
      this.products = [...products];
    })
  }

  collectOrder(orders: Order[]) {
    this.orders = orders;
  }

  receivePayment(newPayment: number) {
    this.profit += newPayment;
    this.service.updateSales(this.orders);
  }
}
