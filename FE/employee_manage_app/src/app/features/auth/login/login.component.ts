import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private toastr = inject(ToastrService);

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    isLoading = false;

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;
            const { email, password } = this.loginForm.value;

            this.authService.login({ email, password }).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.toastr.success('Login successful', 'Welcome');
                    this.router.navigate(['/employees']);
                },
                error: (err) => {
                    this.isLoading = false;
                    // Extract error message from API response if possible
                    const message = err.error?.message || 'Invalid email or password';
                    this.toastr.error(message, 'Login Failed');
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
