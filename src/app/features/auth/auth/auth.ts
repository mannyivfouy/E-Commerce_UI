import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLoginMode: boolean = true;
  loading: boolean = false;
  errorMessage: string = '';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {        
        localStorage.setItem('token', res.token);

        if (!res.role) {
          console.error('Role missing from response');
          this.loading = false;
          return;
        }

        const role = res.role.toLowerCase();
        localStorage.setItem('role', role);

        this.router.navigate([role === 'admin' ? '/admin' : '/client']);

        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login Failed';
        this.loading = false;
      },
    });
  }

  submitRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.isLoginMode = true;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login Failed';
        this.loading = false;
      },
    });
  }
}
