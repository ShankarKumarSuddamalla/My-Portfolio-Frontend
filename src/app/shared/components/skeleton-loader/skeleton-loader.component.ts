import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-grid" [ngSwitch]="type">
      <!-- Card Skeleton -->
      <ng-container *ngSwitchCase="'card'">
        <div class="skeleton-card glass-card" *ngFor="let item of items">
          <div class="skeleton-box img-placeholder"></div>
          <div class="skeleton-box title-placeholder"></div>
          <div class="skeleton-box text-placeholder"></div>
          <div class="skeleton-box text-placeholder short"></div>
        </div>
      </ng-container>

      <!-- Table Skeleton -->
      <ng-container *ngSwitchCase="'table'">
        <div class="skeleton-table glass-card">
          <div class="skeleton-row" *ngFor="let item of items">
            <div class="skeleton-box cell"></div>
            <div class="skeleton-box cell wide"></div>
            <div class="skeleton-box cell"></div>
            <div class="skeleton-box cell btn"></div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
      width: 100%;
    }
    .skeleton-card {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .img-placeholder { height: 180px; width: 100%; border-radius: var(--border-radius-sm); }
    .title-placeholder { height: 24px; width: 70%; }
    .text-placeholder { height: 14px; width: 100%; }
    .text-placeholder.short { width: 45%; }
    
    .skeleton-table {
      grid-column: 1 / -1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .skeleton-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .cell { height: 20px; width: 100px; }
    .cell.wide { flex: 1; }
    .cell.btn { width: 60px; }
  `]
})
export class SkeletonLoaderComponent {
  @Input() type: 'card' | 'table' = 'card';
  @Input() count = 3;

  get items(): number[] {
    return Array.from({ length: this.count });
  }
}
