import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { Router } from '@angular/router';
import { UserForm } from "../user-form/user-form";

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, Avatar, UserForm],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: User[] = [];
  loading: boolean = false;

  showModal: boolean = false;
  selectedUser: User | null = null;

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
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  deleteUser() {}

  openAddForm() {
    this.selectedUser = null;
    this.showModal = true;
  }

  openEditForm(user: any) {
    // this.router.navigate(['/admin/users/edit', user._id]);
  }

  closeModal(refresh: boolean = false) {
    this.showModal = false;
    this.selectedUser = null;
    if (refresh) this.getUsers(); // refresh list after save
  }
}
