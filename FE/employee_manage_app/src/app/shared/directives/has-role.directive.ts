import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy, inject, Optional } from '@angular/core';
import { AuthService, UserRole } from '@core/services/auth.service';
import { effect } from '@angular/core';

/**
 * HasRoleDirective
 *
 * Structural directive to show/hide content based on user role.
 *
 * Usage:
 * <button *appHasRole="'Admin'"> ... </button>
 * <button *appHasRole="['Admin', 'Manager']"> ... </button>
 *
 * The element will only be displayed if the current user has one of the specified roles.
 */
@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  // Required roles (string or array of strings)
  @Input()
  set appHasRole(roles: string | string[]) {
    this.requiredRoles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  // Internal storage for required roles
  private requiredRoles: string[] = [];

  // Inject dependencies
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<any>, { optional: true });
  private viewContainer = inject(ViewContainerRef);

  // Track if view is currently created
  private hasView = false;

  // Effect to react to user changes - created during field initialization (injection context)
  private userEffect = effect(() => {
    // Access user signal to establish dependency
    this.authService.currentUser();
    // Update view when user changes
    this.updateView();
  });

  ngOnInit(): void {
    // Initial view update
    this.updateView();
  }

  /**
   * Update view based on user role
   */
  private updateView(): void {
    if (!this.templateRef) return; // Exit if template ref not available

    const hasPermission = this.authService.hasAnyRole(this.requiredRoles);

    if (hasPermission && !this.hasView) {
      // User has permission and view not shown -> create view
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasPermission && this.hasView) {
      // User doesn't have permission and view is shown -> clear view
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  /**
   * Cleanup effect on destroy
   */
  ngOnDestroy(): void {
    if (this.userEffect) {
      this.userEffect.destroy();
    }
  }
}
