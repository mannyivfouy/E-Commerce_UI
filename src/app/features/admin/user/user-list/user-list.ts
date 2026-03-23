import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { UserForm } from '../user-form/user-form';
import { Search } from '../../../../shared/components/search/search';
import { Pagination } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, Avatar, UserForm, Search, Pagination],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: User[] = [];
  loading: boolean = false;

  showModal: boolean = false;
  selectedUser: User | null = null;

  searchTerm: string = '';
  filteredUser: User[] = [];

  currentpage: number = 1;
  pageSize: number = 10;
  pagedUsers: User[] = [];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.filteredUser = res;
        this.currentpage = 1;
        this.updatePagedUsers();
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

    this.filteredUser = this.users.filter((user) =>
      user.fullname.toLowerCase().includes(value.toLowerCase()),
    );

    this.currentpage = 1;
    this.updatePagedUsers();
  }

  updatePagedUsers() {
    const start = (this.currentpage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedUsers = this.filteredUser.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentpage = page;
    this.updatePagedUsers();
  }

  get totalPages(): number {
    return Math.ceil(this.pagedUsers.length / this.pageSize);
  }

  openAddForm() {
    this.selectedUser = null;
    this.showModal = true;
  }

  openEditForm(user: User) {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal(result: User | null) {
    this.showModal = false;

    if (result) {
      if (this.selectedUser) {
        // Update existing user
        this.updateUser(result);
      } else {
        // Add new user
        this.addUser(result);
      }
    }
  }

  addUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: (res) => {
        this.users.push(res);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  updateUser(user: User) {
    if (!this.selectedUser?._id) return;

    this.userService.updateUser(this.selectedUser._id, user).subscribe({
      next: (res) => {
        const index = this.users.findIndex((u) => u._id === res._id);
        if (index !== -1) this.users[index] = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  deleteUser(user: User) {
    if (!user._id) return;

    if (!confirm(`Are you sure you want to delete ${user.fullname}?`)) return;

    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u._id !== user._id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }
}
