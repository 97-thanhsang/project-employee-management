import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="footer mt-auto py-3 bg-white border-top text-center text-muted">
      <div class="container">
        <span class="small">&copy; {{ year }} Employee Management System. All rights reserved.</span>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      width: 100%;
    }
  `]
})
export class FooterComponent {
    year = new Date().getFullYear();
}
