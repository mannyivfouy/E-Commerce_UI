import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../core/services/product-service';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { Search } from "../../../../shared/components/search/search";

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, Pagination, Search],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  loading: boolean = false;

  searchTerm: string = '';
  filteredProduct: Product[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  pagedProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private crd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;

    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        this.filteredProduct = res.products;
        this.currentPage = 1;
        this.updatePagedProducts();
        this.loading = false;
        this.crd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  onSearch(value: string) {
    this.searchTerm = value;

    this.filteredProduct = this.products.filter((product) =>
      product.productName.toLocaleLowerCase().includes(value.toLowerCase()),
    );

    this.currentPage = 1;
    this.updatePagedProducts();
  }

  updatePagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = [...this.filteredProduct.slice(start, end)];
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProduct.length / this.pageSize);
  }
}
