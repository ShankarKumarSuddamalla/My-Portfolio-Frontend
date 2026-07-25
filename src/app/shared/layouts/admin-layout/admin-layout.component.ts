import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, BreadcrumbComponent, ToastComponent],
  template: `
    <div class="admin-layout-wrapper">
      <app-toast></app-toast>
      <app-sidebar></app-sidebar>
      <main class="admin-content-area">
        <app-breadcrumb></app-breadcrumb>
        <div class="admin-container">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout-wrapper {
      display: flex;
      min-height: 100vh;
      background: var(--bg-body);
    }
    .admin-content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    .admin-container {
      padding: 0 24px 40px 24px;
      flex: 1;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
    }
  `]
})
export class AdminLayoutComponent {}
