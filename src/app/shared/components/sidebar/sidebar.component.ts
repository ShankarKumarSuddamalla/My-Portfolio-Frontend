import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="admin-sidebar glass-panel" [class.collapsed]="isCollapsed()">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="user-badge" *ngIf="!isCollapsed()">
          <img [src]="authService.currentUser()?.avatarUrl || '/assets/profile.png'" alt="User Avatar" class="user-avatar" />
          <div class="user-info">
            <span class="user-name">{{ authService.currentUser()?.fullName || 'Shankar Kumar Suddamalla' }}</span>
            <span class="user-role">FULL-STACK ENGINEER</span>
          </div>
        </div>
        <button (click)="toggleCollapse()" class="collapse-btn" [title]="isCollapsed() ? 'Expand Sidebar' : 'Collapse Sidebar'">
          <i class="fa-solid" [class.fa-angle-left]="!isCollapsed()" [class.fa-angle-right]="isCollapsed()"></i>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <span class="section-label" *ngIf="!isCollapsed()">MANAGEMENT</span>

        <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-chart-line"></i>
          <span *ngIf="!isCollapsed()">Dashboard Stats</span>
        </a>

        <a routerLink="/admin/projects" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-diagram-project"></i>
          <span *ngIf="!isCollapsed()">Add Projects</span>
        </a>

        <a routerLink="/admin/skills" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-code"></i>
          <span *ngIf="!isCollapsed()">Add Skills</span>
        </a>

        <a routerLink="/admin/experience" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-briefcase"></i>
          <span *ngIf="!isCollapsed()">Add Work Experience</span>
        </a>

        <a routerLink="/admin/education" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-graduation-cap"></i>
          <span *ngIf="!isCollapsed()">Add Education History</span>
        </a>

        <a routerLink="/admin/ideas" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-lightbulb"></i>
          <span *ngIf="!isCollapsed()">Add Ideas</span>
        </a>

        <span class="section-label" *ngIf="!isCollapsed()">METRICS & AUDIT</span>

        <a routerLink="/admin/analytics" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-chart-pie"></i>
          <span *ngIf="!isCollapsed()">Traffic Analytics</span>
        </a>

        <a routerLink="/admin/contact" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-envelope"></i>
          <span *ngIf="!isCollapsed()">Messages Inbox</span>
        </a>

        <a routerLink="/admin/profile" routerLinkActive="active" class="nav-item">
          <i class="fa-solid fa-user-gear"></i>
          <span *ngIf="!isCollapsed()">Profile & Resume</span>
        </a>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <a routerLink="/" class="nav-item public-site-btn">
          <i class="fa-solid fa-globe"></i>
          <span *ngIf="!isCollapsed()">Public Portfolio</span>
        </a>

        <button (click)="themeService.toggleTheme()" class="nav-item theme-btn">
          <i class="fa-solid" [class.fa-sun]="themeService.currentTheme() === 'dark'" [class.fa-moon]="themeService.currentTheme() === 'light'"></i>
          <span *ngIf="!isCollapsed()">Toggle Theme</span>
        </button>

        <button (click)="authService.logout()" class="nav-item logout-btn">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span *ngIf="!isCollapsed()">Logout</span>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .admin-sidebar {
      width: 260px;
      height: 100vh;
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--glass-border);
      background: var(--bg-sidebar);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 900;

      &.collapsed {
        width: 76px;
        .sidebar-header { justify-content: center; padding: 16px 8px; }
        .nav-item { justify-content: center; padding: 12px; }
      }
    }
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
    }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-avatar {
      width: 38px;
      height: 38px;
      border-radius: var(--border-radius-full);
      object-fit: cover;
      border: 2px solid var(--primary-color);
    }
    .user-info {
      display: flex;
      flex-direction: column;
      .user-name {
        font-weight: 700;
        font-size: 0.88rem;
        color: var(--text-main);
      }
      .user-role {
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--primary-color);
        letter-spacing: 0.05em;
      }
    }
    .collapse-btn {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      width: 32px;
      height: 32px;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      &:hover { background: var(--bg-card-hover); }
    }
    .sidebar-nav {
      flex: 1;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }
    .section-label {
      font-size: 0.68rem;
      font-weight: 800;
      color: var(--text-muted);
      letter-spacing: 0.1em;
      padding: 12px 12px 6px 12px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 14px;
      border-radius: var(--border-radius-sm);
      color: var(--text-secondary);
      font-size: 0.88rem;
      font-weight: 600;
      text-decoration: none;
      background: transparent;
      border: none;
      width: 100%;
      cursor: pointer;
      transition: all 0.2s;
      
      i { font-size: 1.1rem; width: 20px; text-align: center; }

      &:hover {
        color: var(--text-main);
        background: rgba(255, 255, 255, 0.05);
      }

      &.active {
        color: #ffffff;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%);
        box-shadow: 0 4px 15px var(--primary-glow);
      }
    }
    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .public-site-btn {
      color: var(--accent-color);
      &:hover { background: rgba(14, 165, 233, 0.1); }
    }
    .theme-btn {
      color: var(--text-secondary);
    }
    .logout-btn {
      color: #f43f5e;
      &:hover { background: rgba(244, 63, 94, 0.1); }
    }
  `]
})
export class SidebarComponent {
  public authService = inject(AuthService);
  public themeService = inject(ThemeService);
  public isCollapsed = signal<boolean>(false);

  public toggleCollapse(): void {
    this.isCollapsed.update(v => !v);
  }
}
