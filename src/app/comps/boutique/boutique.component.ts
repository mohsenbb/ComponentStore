import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Product } from "../product.model";
import { createOrder, Order } from "../order.model";
import { OperationsService } from "../operations.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit, OnChanges, OnInit, OnDestroy {

  // TODO:
  //   With the right updaters, patchers and selectors, we can do without
  //   1. the `@Input`
  //   2. the `@Output`
  //   3. move the orderMap and it's logic to the store
  @Input() products!: Product[] | null;
  @Output() emitOrder = new EventEmitter<Order[]>();
  orderMap = new Map<number, Order>;

  sub = new Subscription();

  // TODO: dataSource should be initialized from the products$ selector
  dataSource: any;
  displayedColumns: string[] = ['sold', 'name', 'cost', 'quantity'];

  constructor(private store: OperationsService,
              private cd: ChangeDetectorRef) {
  }

  // TODO:
  //   1. because you're accessing products$ from the store and already made the "bind"
  //      between it and `dataSource`, you don't need current the statement in `ngOnInit()`
  //   2. in the store, create an `emitPaymentProcessed` event emitter that emits
  //      at the end of the `updateSales()` method ops
  //   3. subscribe to `emitPaymentProcessed` and assign subscription to `sub`;
  //      subscribe to do what? call `refresh()` below
  //   4. [DONE] unsubscribe `sub` `ngOnDestroy`
  ngOnInit() {
    this.dataSource = this.products;
  }

  ngOnChanges() {
    this.orderMap.clear();
    this.refreshUI();
  }

  // TODO:
  //   Will always need this because quantity is not part of model displayed,
  //   so to refresh the view and empty those input fields, we jolt the UI with
  //   temp change to the dataSource.
  //   1. But, remember, what should `dataSource` be bound to?
  refreshUI() {
    this.dataSource = [];
    this.cd.detectChanges();
    this.dataSource = this.products;
  }

  // TODO: move method to store, we also need:
  //   1. patchState of orders with updated orders
  //   2. patchState of paymentDue with new payment
  //   This means, we no longer need to emit orders using @Output
  addOrder(quantity: string, product: Product) {
    const newOrder = createOrder(quantity, product);
    this.orderMap.set(+product.id, newOrder);
    this.emitOrder.emit([...this.orderMap.values()]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
