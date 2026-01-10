import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, NzIconModule, NzDropDownModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() isCollapsed = false;
    @Output() toggleCollapse = new EventEmitter<void>();

    private authService = inject(AuthService);
    private router = inject(Router);

    user = this.authService.currentUser;

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
