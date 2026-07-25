import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="dialog-wrapper glass-card">
      <div class="dialog-header">
        <div class="icon-circle" [class.danger]="data.isDanger">
          <i class="fa-solid" [class.fa-trash-can]="data.isDanger" [class.fa-circle-question]="!data.isDanger"></i>
        </div>
        <h3>{{ data.title }}</h3>
      </div>
      <div class="dialog-body">
        <p>{{ data.message }}</p>
      </div>
      <div class="dialog-actions">
        <button class="btn-secondary" (click)="onCancel()">{{ data.cancelText || 'Cancel' }}</button>
        <button [class.btn-primary]="!data.isDanger" [class.btn-danger]="data.isDanger" (click)="onConfirm()">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-wrapper {
      padding: 28px;
      border-radius: var(--border-radius-lg);
      background: var(--bg-surface);
      color: var(--text-main);
      max-width: 440px;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 14px;
      h3 { font-size: 1.2rem; font-weight: 700; margin: 0; }
    }
    .icon-circle {
      width: 44px;
      height: 44px;
      border-radius: var(--border-radius-full);
      background: rgba(99, 102, 241, 0.15);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      &.danger {
        background: rgba(244, 63, 94, 0.15);
        color: #f43f5e;
      }
    }
    .dialog-body {
      p { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 24px; }
    }
    .dialog-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn-danger {
      background: #f43f5e;
      color: #ffffff;
      border: none;
      padding: 10px 24px;
      border-radius: var(--border-radius-sm);
      font-weight: 600;
      cursor: pointer;
      &:hover { background: #e11d48; }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }
}
