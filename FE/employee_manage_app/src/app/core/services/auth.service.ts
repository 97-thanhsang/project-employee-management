import { Injectable } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';

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
  // Current logged-in user
  private currentUserSignal: WritableSignal<User | null> = signal(null);

  // Expose user as read-only
  readonly currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    // Mock: Set logged-in Admin user on app init
    this.initializeMockUser();
  }

  /**
   * Initialize mock user (for development/demo)
   * In production: Replace with actual login() method
   */
  private initializeMockUser(): void {
    const mockUser: User = {
      userId: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: UserRole.Admin,
      fullName: 'Administrator',
      isAuthenticated: true
    };
    this.currentUserSignal.set(mockUser);
  }

  /**
   * Check if current user has a specific role
   * @param role Role to check
   * @returns true if user has role, false otherwise
   */
  hasRole(role: UserRole | string): boolean {
    const user = this.currentUserSignal();
    return user ? user.role === role : false;
  }

  /**
   * Check if user has any of the provided roles
   * @param roles Array of roles to check
   * @returns true if user has any of the roles
   */
  hasAnyRole(roles: (UserRole | string)[]): boolean {
    const user = this.currentUserSignal();
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Get current user (readonly signal)
   * Usage: this.authService.currentUser()
   */
  getUser(): User | null {
    return this.currentUserSignal();
  }

  /**
   * Check if user is authenticated
   * @returns true if user is authenticated
   */
  isAuthenticated(): boolean {
    const user = this.currentUserSignal();
    return user ? user.isAuthenticated : false;
  }

  /**
   * Logout user
   * In production: Clear JWT token from storage
   */
  logout(): void {
    this.currentUserSignal.set(null);
  }

  /**
   * Mock login method (for development)
   * In production: Make HTTP call to backend
   * @param username Username
   * @param password Password
   */
  login(username: string, password: string): void {
    // This is a mock implementation
    const mockUser: User = {
      userId: 1,
      username: username,
      email: `${username}@example.com`,
      role: UserRole.Admin,
      fullName: 'Test User',
      isAuthenticated: true
    };
    this.currentUserSignal.set(mockUser);
  }
}
