import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from "../product.model";
import { createOrder, Order } from "../order.model";
import { OperationsService } from "../operations.service";

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit, OnChanges {
  @Input() products!: Product[] | null;
  @Output() emitOrder = new EventEmitter<Order[]>();

  orderMap = new Map<number, Order>;

  dataSource: any;
  displayedColumns: string[] = ['sold', 'name', 'cost', 'quantity'];

  constructor(private store: OperationsService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataSource = this.products;
  }

  ngOnChanges() {
    this.orderMap.clear();
    this.refreshUI();
  }

  // will always need this because quantity is not part of model displayed,
  // so to refresh the view and empty those input fields, we jolt the UI with
  // temp change of the dataSource
  refreshUI() {
    this.dataSource = [];
    this.cd.detectChanges();
    this.dataSource = this.products;
  }

  // TODO: move method to store, we also need:
  //   1. patchState of orders with updated orders
  //   2. patchState of paymentDue with new payment
  addOrder(quantity: string, product: Product) {
    const newOrder = createOrder(quantity, product);
    this.orderMap.set(+product.id, newOrder);
    this.emitOrder.emit([...this.orderMap.values()]);
  }
}
