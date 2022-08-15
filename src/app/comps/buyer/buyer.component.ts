import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { getOrdersWithQuantity, getPaymentDue, Order } from "../order.model";

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnChanges {
  @Input() orders: Order[] = [];
  @Output() emitPayment = new EventEmitter<number>();

  paymentDue = 0;

  dataSource: any;
  displayedColumns: string[] = ['name', 'cost', 'quantity', 'due'];

  ngOnChanges() {
    this.orders = getOrdersWithQuantity(this.orders);
    this.paymentDue = getPaymentDue(this.orders);
    this.dataSource = this.orders;
  }

  makePayment() {
    this.emitPayment.emit(this.paymentDue);
    this.paymentDue = 0;
    this.dataSource = [];
  }
}
