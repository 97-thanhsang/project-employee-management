import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { OverviewService } from '../../services/overview.service';

@Component({
    selector: 'app-employee-overview',
    standalone: true,
    imports: [CommonModule, RouterLink, NzGridModule, NzCardModule, NzStatisticModule, NzIconModule, NzButtonModule],
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    private authService = inject(AuthService);
    private overviewService = inject(OverviewService);

    user = this.authService.currentUser;

    employeeCount = 0;
    departmentCount = 0;

    ngOnInit() {
        this.overviewService.getEmployeeCount().subscribe(count => this.employeeCount = count);
        this.overviewService.getDepartmentCount().subscribe(count => this.departmentCount = count);
    }
}
