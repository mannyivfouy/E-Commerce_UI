import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<User | null>();

  userForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      fullname: [this.user?.fullname || '', [Validators.required, Validators.minLength(3)]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: ['', this.user ? [] : [Validators.required, Validators.minLength(3)]],
      role: [this.user?.role || 'User', Validators.required],
      status: [this.user?.status ?? true],
    });
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading;
    const formData: User = this.userForm.value;

    if (this.user?._id) {
      this.userService.updateUser(this.user._id, formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.close.emit(res);
        },
        error: () => {
          this.loading = false;
          alert('Failed To Update User');
        },
      });
    } else {
      this.userService.createUser(formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.close.emit(res);
        },
        error: () => {
          this.loading = false;
          alert('Failed To Create User');
        },
      });
    }
  }

  cancel() {
    this.close.emit(null);
  }
}
