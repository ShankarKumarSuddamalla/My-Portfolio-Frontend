import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-item glass-card" [ngClass]="toast.type">
          <div class="toast-icon">
            @switch (toast.type) {
              @case ('success') { <i class="fa-solid fa-circle-check"></i> }
              @case ('error') { <i class="fa-solid fa-triangle-exclamation"></i> }
              @case ('warning') { <i class="fa-solid fa-circle-exclamation"></i> }
              @default { <i class="fa-solid fa-circle-info"></i> }
            }
          </div>
          <div class="toast-body">
            <span class="toast-title">{{ toast.title }}</span>
            <p class="toast-desc">{{ toast.message }}</p>
          </div>
          <button class="toast-close" (click)="toastService.remove(toast.id)" aria-label="Close Notification">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
      width: calc(100% - 48px);
      pointer-events: none;
    }
    .toast-item {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 16px;
      border-radius: var(--border-radius-md);
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      
      &.success {
        border-left: 4px solid #10b981;
        .toast-icon { color: #10b981; }
      }
      &.error {
        border-left: 4px solid #f43f5e;
        .toast-icon { color: #f43f5e; }
      }
      &.warning {
        border-left: 4px solid #f59e0b;
        .toast-icon { color: #f59e0b; }
      }
      &.info {
        border-left: 4px solid #38bdf8;
        .toast-icon { color: #38bdf8; }
      }
    }
    .toast-icon {
      font-size: 1.3rem;
      margin-top: 2px;
    }
    .toast-body {
      flex: 1;
    }
    .toast-title {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-main);
      display: block;
      margin-bottom: 2px;
    }
    .toast-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }
    .toast-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1rem;
      padding: 4px;
      transition: color 0.2s;
      &:hover { color: var(--text-main); }
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
}
