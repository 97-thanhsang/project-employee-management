import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private toastr = inject(ToastrService);
    private cdr = inject(ChangeDetectorRef);

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    isLoading = false;

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;
            const { email, password } = this.loginForm.value;

            this.authService.login({ email, password })
                .subscribe({
                    next: (response) => {
                        this.isLoading = false;
                        this.toastr.success('Login successful', 'Welcome');
                        this.router.navigate(['/dashboard']);
                    },
                    error: (err) => {
                        debugger;
                        this.isLoading = false;
                        this.cdr.detectChanges(); // Force check to resolve NG0100

                        if (err.status === 401) {
                            this.toastr.error('Incorrect email or password.', 'Login Failed');
                        } else if (err.status === 400) {
                            // Bad Request (Validation from server)
                            const message = err.error?.message || 'Invalid request data.';
                            this.toastr.error(message, 'Validation Error');
                        } else {
                            // Other errors (handled by interceptor largely, but good to have fallback)
                            // If interceptor re-throws, we catch it here too.
                            const message = err.error?.message || 'An error occurred during login.';
                            this.toastr.error(message, 'Error');
                        }
                    }
                });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
