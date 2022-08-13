import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Order } from "../order.model";

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnChanges {

  @Input() orders!: Order[];

  @Output() emitPayment = new EventEmitter<number>();
  @Output() emitPaidUp = new EventEmitter<any>();

  total = 0;

  dateSource: any;
  displayedColumns: string[] = ['name', 'cost', 'quantity', 'due'];

  ngOnChanges() {
    this.orders = this.orders?.filter(order => order.quantity > 0);
    this.setTotal();
    this.dateSource = this.orders;
  }

  setTotal() {
    this.total = this.orders?.reduce((acc, order) =>
      acc + order.cost * order.quantity, 0);
  }

  payUp() {
    if (!this.total) {
      return;
    }
    this.emitPayment.emit(this.total);
    this.emitPaidUp.emit();
    this.total = 0;
    this.orders = [];
    this.dateSource = this.orders;
  }
}
