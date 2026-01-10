import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../services/auth.service';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, NzGridModule, NzCardModule, NzStatisticModule, NzIconModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private authService = inject(AuthService);
    private dashboardService = inject(DashboardService);

    user = this.authService.currentUser;

    employeeCount = 0;
    departmentCount = 0;

    ngOnInit() {
        this.dashboardService.getEmployeeCount().subscribe(count => this.employeeCount = count);
        this.dashboardService.getDepartmentCount().subscribe(count => this.departmentCount = count);
    }
}
