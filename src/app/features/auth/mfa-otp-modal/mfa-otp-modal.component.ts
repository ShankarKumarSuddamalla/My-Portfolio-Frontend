import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ToastService } from '../../../core/services/toast.service';

export interface MfaDialogData {
  email: string;
  mobileNumber: string;
}

@Component({
  selector: 'app-mfa-otp-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="mfa-modal glass-card">
      <div class="modal-header">
        <div class="mfa-icon-shield">
          <i class="fa-solid fa-envelope-circle-check text-indigo"></i>
        </div>
        <h3>Two-Factor Email Verification (2FA)</h3>
        <p>A 6-digit security verification code has been sent to your email address:</p>
        <span class="email-badge badge badge-accent">
          <i class="fa-solid fa-envelope"></i>
          <span>{{ data.email || 'suddamallashankarkumar@gmail.com' }}</span>
        </span>
      </div>

      <form [formGroup]="otpForm" (ngSubmit)="onVerify()" class="otp-form">
        <div class="custom-form-field">
          <label for="otpCode">Enter 6-Digit Email OTP Code</label>
          <input
            id="otpCode"
            type="text"
            formControlName="otpCode"
            placeholder="••••••"
            maxlength="6"
            class="otp-input-field"
            autocomplete="off"
            autofocus
          />
          <span *ngIf="isInvalid" class="error-text">Please enter the correct 6-digit verification code sent to your email.</span>
        </div>

        <div class="resend-row">
          <span>Didn't receive code in your email?</span>
          <button type="button" (click)="resendOtp()" [disabled]="resendTimer > 0" class="resend-btn">
            {{ resendTimer > 0 ? 'Resend code in ' + resendTimer + 's' : 'Resend Email OTP' }}
          </button>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="otpForm.invalid || isVerifying">
            @if (isVerifying) {
              <i class="fa-solid fa-circle-notch fa-spin"></i>
              <span>Verifying Code...</span>
            } @else {
              <i class="fa-solid fa-circle-check"></i>
              <span>Verify & Access Dashboard</span>
            }
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .mfa-modal {
      padding: 36px;
      max-width: 460px;
      border-radius: var(--border-radius-lg);
      background: var(--bg-surface);
      color: var(--text-main);
      text-align: center;
    }
    .mfa-icon-shield {
      width: 60px;
      height: 60px;
      border-radius: var(--border-radius-md);
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px auto;
    }
    .modal-header {
      h3 { font-size: 1.35rem; font-weight: 800; margin-bottom: 6px; }
      p { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 12px; }
      .email-badge { font-size: 0.88rem; padding: 6px 14px; margin-bottom: 20px; display: inline-flex; align-items: center; gap: 8px; }
    }
    .otp-form { display: flex; flex-direction: column; gap: 18px; margin-top: 10px; text-align: left; }
    .otp-input-field {
      letter-spacing: 0.4em;
      font-size: 1.4rem;
      font-weight: 800;
      text-align: center;
      font-family: var(--font-code);
    }
    .resend-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-secondary);
      .resend-btn { background: transparent; border: none; color: var(--primary-color); font-weight: 700; cursor: pointer; &:disabled { color: var(--text-muted); cursor: not-allowed; } }
    }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
    .text-indigo { color: #818cf8; }
  `]
})
export class MfaOtpModalComponent implements OnInit {
  public fb = inject(FormBuilder);
  public toastService = inject(ToastService);

  public isVerifying = false;
  public isInvalid = false;
  public resendTimer = 30;
  private intervalTimer: any;

  public otpForm: FormGroup = this.fb.group({
    otpCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  constructor(
    public dialogRef: MatDialogRef<MfaOtpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MfaDialogData
  ) {}

  public ngOnInit(): void {
    this.startResendTimer();
    this.toastService.info('2FA Security Email Dispatched', `Verification code sent to ${this.data.email}`);
  }

  private startResendTimer(): void {
    this.resendTimer = 30;
    if (this.intervalTimer) clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        clearInterval(this.intervalTimer);
      }
    }, 1000);
  }

  public resendOtp(): void {
    if (this.resendTimer > 0) return;
    this.startResendTimer();
    this.toastService.info('2FA Security Email Resent', `New verification code sent to ${this.data.email}`);
  }

  public cancel(): void {
    if (this.intervalTimer) clearInterval(this.intervalTimer);
    this.dialogRef.close(null);
  }

  public onVerify(): void {
    if (this.otpForm.invalid) return;
    const inputOtp = this.otpForm.value.otpCode.trim();

    this.isVerifying = true;
    this.isInvalid = false;
    setTimeout(() => {
      if (this.intervalTimer) clearInterval(this.intervalTimer);
      this.dialogRef.close(inputOtp);
    }, 400);
  }
}
