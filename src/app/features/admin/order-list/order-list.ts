import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../core/services/order-service';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit {
  orders: Order[] = [];
  loading: boolean = false;

  searchTerm: string = '';
  filteredOrder: Order[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  pagedOrders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;

    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.filteredOrder = res;
        this.currentPage = 1;
        this.updatePagedOrders();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  onSearch(value: string) {
    this.searchTerm = value;

    this.filteredOrder = this.orders.filter((order) => {
      order.user.toLocaleLowerCase().includes(value.toLowerCase());
    });

    this.currentPage = 1;
    this.updatePagedOrders();
  }

  updatePagedOrders() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedOrders = [...this.filteredOrder.slice(start, end)];
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedOrders();
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredOrder.length / this.pageSize);
  }
}
