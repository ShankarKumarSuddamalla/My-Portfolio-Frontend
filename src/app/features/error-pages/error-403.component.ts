import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-403',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="error-page-container">
      <div class="error-card glass-card">
        <h1 class="error-code text-rose">403</h1>
        <h2>Access Denied</h2>
        <p>You do not have administrative JWT claims to view this content.</p>
        <a routerLink="/auth/login" class="btn-primary">
          <i class="fa-solid fa-lock"></i>
          <span>Authenticate as Administrator</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .error-page-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .error-card { text-align: center; padding: 60px 40px; max-width: 480px; width: 100%; }
    .error-code { font-size: 5rem; font-weight: 900; margin: 0; line-height: 1; color: #f43f5e; }
    h2 { font-size: 1.4rem; font-weight: 800; margin: 12px 0; }
    p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 24px; }
  `]
})
export class Error403Component {}
