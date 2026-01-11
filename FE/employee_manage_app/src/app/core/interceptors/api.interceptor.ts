import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError, finalize } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const toastr = inject(ToastrService);
    // We use Injector to get AuthService if needed, but here we can rely on localStorage 
    // or inject AuthService if there is no circular dependency. 
    // Since AuthService depends on HttpClient, and HttpClient uses this Interceptor, 
    // injection of AuthService here MIGHT cause a specific circle if AuthService makes a call in constructor.
    // However, AuthService constructor is safe (just reads LS).
    // But to be absolutely safe and "dumb", we can read the token directly or use inject(AuthService).
    // Let's try direct injection first, usually HttpInterceptorFn handles this better than class-based.
    const injector = inject(Injector);
    // Lazy injection to avoid Circular Dependency (AuthService -> HttpClient -> ApiInterceptor -> AuthService)
    const getAuthService = () => injector.get(AuthService);

    const token = localStorage.getItem('authToken'); // Direct read or use authService.getToken() if available

    let clonedReq = req;

    if (token) {
        clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(clonedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            debugger;
            let errorMessage = 'An unknown error occurred!';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
                toastr.error(errorMessage, 'Client Error');
            } else {
                // Server-side error
                switch (error.status) {
                    case 401:
                        // Don't auto-logout on failed login attempt
                        if (req.url.includes('/Auth/login') || req.url.includes('/auth/login')) {
                            break; // Let the component handle it
                        }

                        toastr.warning('Session expired. Please login again.', 'Unauthorized');
                        getAuthService().logout();
                        router.navigate(['/auth/login']);
                        break;
                    case 403:
                        toastr.error('You do not have permission to perform this action.', 'Forbidden');
                        break;
                    case 404:
                        // Optional: Don't always toast 404, specific services might handle it.
                        // But for now, let's leave it to the caller or toast if needed.
                        // toastr.error('Resource not found.', 'Not Found'); 
                        break;
                    case 500:
                        toastr.error('Internal Server Error. Please try again later.', 'Server Error');
                        break;
                    default:
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        toastr.error(errorMessage, 'API Error');
                        break;
                }
            }

            // Re-throw so stores can handle specific logic (e.g. stop loading state)
            return throwError(() => error);
        }),
        finalize(() => {
            // Global loading stop logic could go here if we had a LoaderService
        })
    );
};
