import { Component } from '@angular/core';

interface Transaction {
  id: number;
  item: string;
  cost: number;
  orders?: number | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['item', 'cost', 'orders'];
  transactions: Transaction[] = [
    {id: 10, item: 'Beach ball', cost: 14},
    {id: 20, item: 'Towel', cost: 5},
    {id: 30, item: 'Frisbee', cost: 2},
    {id: 40, item: 'Sunscreen', cost: 4},
    {id: 50, item: 'Cooler', cost: 25},
    {id: 60, item: 'Swim suit', cost: 15},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  getOrders(orders: any, element:any) {
    console.log(orders, element)
  }
}
