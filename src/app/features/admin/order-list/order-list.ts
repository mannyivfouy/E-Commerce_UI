import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../core/services/order-service';
import { Search } from '../../../shared/components/search/search';
import { Pagination } from "../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, Search, Pagination],
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
    const term = value.toLowerCase();
    this.searchTerm = term;

    this.filteredOrder = this.orders.filter((order) => {
      const fullname = typeof order.user === 'string' ? order.user : order.user.fullname;

      const email = typeof order.user === 'string' ? '' : order.user.email;

      return (
        fullname.toLowerCase().includes(term) ||
        email.toLowerCase().includes(term)
      );
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
