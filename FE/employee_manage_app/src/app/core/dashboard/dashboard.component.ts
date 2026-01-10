import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-core-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, NzGridModule, NzCardModule, NzIconModule],
    template: `
    <div class="module-selector-container">
      <h2 nz-typography>Select a Module</h2>
      <div nz-row [nzGutter]="16">
        <div nz-col [nzXs]="24" [nzSm]="12" [nzMd]="8">
          <nz-card nzHoverable [nzBordered]="false" class="module-card" routerLink="/employee-manage/dashboard">
            <div class="module-content">
              <span nz-icon nzType="team" nzTheme="outline" class="module-icon"></span>
              <h3>Employee Management</h3>
              <p>Manage employees, departments, and designations.</p>
            </div>
          </nz-card>
        </div>
        <!-- Placeholder for future modules -->
        <div nz-col [nzXs]="24" [nzSm]="12" [nzMd]="8">
          <nz-card nzHoverable [nzBordered]="false" class="module-card coming-soon">
            <div class="module-content">
              <span nz-icon nzType="plus" nzTheme="outline" class="module-icon"></span>
              <h3>New Module</h3>
              <p>Coming soon...</p>
            </div>
          </nz-card>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .module-selector-container {
      padding: 24px;
    }
    .module-card {
      text-align: center;
      cursor: pointer;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .module-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .module-icon {
      font-size: 48px;
      color: #1890ff;
    }
    .coming-soon {
      opacity: 0.6;
      border: 1px dashed #d9d9d9;
    }
  `]
})
export class DashboardComponent { }
