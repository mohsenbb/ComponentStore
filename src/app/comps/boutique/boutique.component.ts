import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Product } from "../product.model";
import { Order } from "../order.model";
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

  constructor(private service: OperationsService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dateSource = this.products;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.orderMap.clear();
    this.dateSource = [];
    this.cd.detectChanges();
    this.dateSource = this.products;
  }

  addOrder(quantity: string, product: Product) {
    const order: Order = {
      id: product.id,
      quantity: +quantity,
      cost: product.cost,
      name: product.name
    };
    this.orderMap.set(+product.id, order);
    this.emitOrder.emit([...this.orderMap.values()]);
  }
}
