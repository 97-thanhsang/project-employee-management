import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/api-response.model';

/**
 * User Role Enum
 */
export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  User = 'User'
}

/**
 * User Interface
 */
export interface User {
  userId: number;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  isAuthenticated: boolean;
}

/**
 * AuthService
 * Manages user authentication and authorization
 *
 * For now, this is a mock service with hardcoded Admin user.
 * In production, you would:
 * 1. Authenticate with backend
 * 2. Store JWT token
 * 3. Decode token to get user info
 * 4. Refresh token on expiry
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal: WritableSignal<User | null> = signal(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  private readonly tokenKey = 'authToken';

  constructor(private http: HttpClient) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      if (this.isTokenExpired(token)) {
        this.logout();
      } else {
        this.setUserFromToken(token);
      }
    }
  }

  login(model: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.apiUrl}/Auth/login`, model).pipe(
      tap((response: ApiResponse<any>) => {
        if (response.data && response.data.token) {
          localStorage.setItem(this.tokenKey, response.data.token);
          this.setUserFromToken(response.data.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSignal.set(null);
  }

  private setUserFromToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);

      // Map claims to User object
      // Note: Adjust claim names based on your actual JWT payload
      const user: User = {
        userId: parseInt(decoded.sub || '0'),
        username: decoded.email || '',
        email: decoded.email || '',
        role: (decoded.role || UserRole.User) as UserRole,
        fullName: decoded.name || decoded.email || 'User',
        isAuthenticated: true
      };

      this.currentUserSignal.set(user);
    } catch (error) {
      console.error('Error decoding token', error);
      this.logout();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp) {
        return Math.floor(Date.now() / 1000) > decoded.exp;
      }
      return false;
    } catch {
      return true;
    }
  }

  hasRole(role: UserRole | string): boolean {
    const user = this.currentUserSignal();
    return user ? user.role === role : false;
  }

  hasAnyRole(roles: (UserRole | string)[]): boolean {
    const user = this.currentUserSignal();
    return user ? roles.includes(user.role) : false;
  }

  getUser(): User | null {
    return this.currentUserSignal();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSignal();
  }
}
