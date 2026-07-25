import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="breadcrumb-bar glass-panel">
      <div class="breadcrumb-path">
        <a routerLink="/admin/dashboard" class="home-link">
          <i class="fa-solid fa-house"></i>
          <span>Admin</span>
        </a>
        @for (crumb of crumbs; track crumb.url) {
          <i class="fa-solid fa-chevron-right separator"></i>
          <a [routerLink]="crumb.url" class="crumb-link">{{ crumb.label }}</a>
        }
      </div>
      <div class="header-right">
        <span class="live-badge">
          <span class="pulse-dot"></span>
          <span>System Online</span>
        </span>
      </div>
    </div>
  `,
  styles: [`
    .breadcrumb-bar {
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 24px;
    }
    .breadcrumb-path {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
    }
    .home-link, .crumb-link {
      color: var(--text-secondary);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      text-transform: capitalize;
      &:hover { color: var(--primary-color); }
    }
    .separator {
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .live-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      font-weight: 700;
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      padding: 4px 12px;
      border-radius: var(--border-radius-full);
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: pulse 1.6s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
  `]
})
export class BreadcrumbComponent {
  private router = inject(Router);
  public crumbs: { label: string; url: string }[] = [];

  constructor() {
    this.buildCrumbs();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.buildCrumbs();
    });
  }

  private buildCrumbs(): void {
    const segments = this.router.url.split('?')[0].split('/').filter(s => s.length > 0);
    this.crumbs = [];
    let currentUrl = '';

    for (const seg of segments) {
      if (seg === 'admin') continue;
      currentUrl += `/admin/${seg}`;
      this.crumbs.push({
        label: seg.replace('-', ' '),
        url: currentUrl
      });
    }
  }
}
