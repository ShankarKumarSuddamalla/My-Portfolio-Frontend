import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../core/authentication/auth.service';
import { MfaOtpModalComponent } from '../mfa-otp-modal/mfa-otp-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatDialogModule],
  template: `
    <div class="auth-page-container">
      <div class="auth-card glass-card">
        <div class="auth-header">
          <div class="logo-box">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h2>System Administrator Sign In</h2>
          <p>Shankar Kumar Suddamalla - Enterprise Management Console</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="custom-form-field">
            <label for="email">Administrator Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="Enter your email"
              [class.invalid]="isFieldInvalid('email')"
              autocomplete="email"
              autofocus
            />
            <span *ngIf="isFieldInvalid('email')" class="error-text">Please enter a valid email address.</span>
          </div>

          <div class="custom-form-field">
            <div class="label-row">
              <label for="password">Password</label>
              <a routerLink="/auth/forgot-password" class="forgot-link">Forgot?</a>
            </div>
            <div class="input-with-icon">
              <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
                placeholder="••••••••••••"
                [class.invalid]="isFieldInvalid('password')"
                autocomplete="current-password"
              />
              <button type="button" (click)="showPassword = !showPassword" class="toggle-eye" aria-label="Toggle password visibility">
                <i class="fa-solid" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <span *ngIf="isFieldInvalid('password')" class="error-text">Password is required.</span>
          </div>

          <div class="remember-row">
            <label class="checkbox-container">
              <input type="checkbox" formControlName="rememberMe" />
              <span class="checkmark"></span>
              <span>Remember this session</span>
            </label>
            <span class="mfa-tag badge badge-accent">
              <i class="fa-solid fa-shield"></i>
              <span>2FA Enabled</span>
            </span>
          </div>

          <button type="submit" class="btn-primary auth-btn" [disabled]="loginForm.invalid || authService.isAuthLoading()">
            @if (authService.isAuthLoading()) {
              <i class="fa-solid fa-circle-notch fa-spin"></i>
              <span>Authenticating...</span>
            } @else {
              <i class="fa-solid fa-right-to-bracket"></i>
              <span>Sign In & Proceed to 2FA</span>
            }
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-page-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background: radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
    }

    .auth-card {
      width: 100%;
      max-width: 440px;
      padding: 40px;
      border-radius: var(--border-radius-lg);
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-xl);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 32px;

      .logo-box {
        width: 56px;
        height: 56px;
        margin: 0 auto 16px;
        background: linear-gradient(135deg, var(--primary-color), #4f46e5);
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        color: white;
        box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
      }

      h2 {
        font-size: 1.45rem;
        font-weight: 800;
        margin-bottom: 6px;
      }

      p {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .custom-form-field {
      display: flex;
      flex-direction: column;
      gap: 6px;

      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-main);
      }

      .label-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .forgot-link {
        font-size: 0.8rem;
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
        &:hover { text-decoration: underline; }
      }

      input {
        width: 100%;
        padding: 12px 14px;
        border-radius: var(--border-radius-sm);
        border: 1px solid var(--border-color);
        background: var(--bg-surface-subtle);
        color: var(--text-main);
        font-size: 0.95rem;
        transition: all 0.2s ease;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        &.invalid {
          border-color: var(--danger-color);
        }
      }

      .input-with-icon {
        position: relative;
        input { padding-right: 42px; }
        .toggle-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.9rem;
          &:hover { color: var(--text-main); }
        }
      }

      .error-text {
        font-size: 0.78rem;
        color: var(--danger-color);
      }
    }

    .remember-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;

      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }

      .mfa-tag {
        font-size: 0.75rem;
        padding: 4px 8px;
      }
    }

    .auth-btn {
      margin-top: 8px;
      width: 100%;
      padding: 12px;
      font-size: 0.95rem;
    }
  `]
})
export class LoginComponent {
  public authService = inject(AuthService);
  public fb = inject(FormBuilder);
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public dialog = inject(MatDialog);

  public showPassword = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [true]
  });

  public isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = this.loginForm.value;
    this.authService.initiateLogin(credentials).subscribe({
      next: (mfaRes) => {
        // Open MFA OTP Verification Modal
        const dialogRef = this.dialog.open(MfaOtpModalComponent, {
          width: '460px',
          disableClose: true,
          data: {
            email: credentials.email,
            mobileNumber: mfaRes.mobileNumber
          }
        });

        dialogRef.afterClosed().subscribe((otpCode: string | null) => {
          if (otpCode) {
            this.authService.verifyMfaOtp(mfaRes.tempToken, otpCode).subscribe({
              next: () => {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
                this.router.navigateByUrl(returnUrl);
              }
            });
          }
        });
      }
    });
  }
}
