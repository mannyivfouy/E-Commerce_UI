import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, Avatar],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: User[] = [];
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router,
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

  editUser() {}

  openAddForm() {
    this.router.navigate(['/admin/users/create']);
  }

  openEditForm(user: any) {
    this.router.navigate(['/admin/users/edit', user._id]);
  }
}
