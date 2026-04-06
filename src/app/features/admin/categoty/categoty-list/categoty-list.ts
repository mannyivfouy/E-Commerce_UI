import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../core/services/category-service';
import { Search } from "../../../../shared/components/search/search";
import { CommonModule } from '@angular/common';
import { Pagination } from "../../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-categoty-list',
  imports: [Search, CommonModule, Pagination],
  templateUrl: './categoty-list.html',
  styleUrl: './categoty-list.css',
})
export class CategotyList implements OnInit{
  categories: Category[] = [];
  loading: boolean = false;

  searchTerm: string = '';
  filteredCategory: Category[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  pagedCategories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.loading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.filteredCategory = res;
        this.currentPage = 1;
        this.updatePagedCategories();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }

  onSearch(value : string){
    this.searchTerm = value;

    this.filteredCategory = this.categories.filter((category) =>
      category.categoryName.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    )

    this.currentPage = 1;
    this.updatePagedCategories();
  }

  updatePagedCategories(){
    const start = (this.currentPage - 1) + this.pageSize;
    const end = start + this.pageSize;
    this.pagedCategories = [...this.filteredCategory.slice(start, end)]
  }

  onPageChange(page: number){
    this.currentPage = page;
    this.updatePagedCategories();
  }

  get totalPage():number{
    return Math.ceil(this.filteredCategory.length / this.pageSize)
  }
}
