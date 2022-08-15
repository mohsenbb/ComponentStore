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
  @Output() emitPaidUp = new EventEmitter<any>();

  paymentDue = 0;

  dateSource: any;
  displayedColumns: string[] = ['name', 'cost', 'quantity', 'due'];

  ngOnChanges() {
    this.orders = getOrdersWithQuantity(this.orders);
    this.paymentDue = getPaymentDue(this.orders);
    this.dateSource = this.orders;
  }

  makePayment() {
    this.emitPayment.emit(this.paymentDue);
    this.emitPaidUp.emit();
    this.paymentDue = 0;
    this.dateSource = [];
  }
}
