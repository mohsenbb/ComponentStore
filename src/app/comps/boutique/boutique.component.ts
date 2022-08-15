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

  dateSource: any;
  displayedColumns: string[] = ['sold', 'name', 'cost', 'quantity'];

  constructor(private store: OperationsService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dateSource = this.products;
  }

  ngOnChanges() {
    this.orderMap.clear();
    this.refreshUI();
  }

  refreshUI() {
    this.dateSource = [];
    this.cd.detectChanges();
    this.dateSource = this.products;
  }

  addOrder(quantity: string, product: Product) {
    const newOrder = createOrder(quantity, product);
    this.orderMap.set(+product.id, newOrder);
    this.emitOrder.emit([...this.orderMap.values()]);
  }
}
