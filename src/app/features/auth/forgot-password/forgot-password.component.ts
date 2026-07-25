import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page-container">
      <div class="auth-card glass-card">
        <div class="auth-header">
          <h2>Forgot Password?</h2>
          <p>Enter your enterprise email to receive a password reset link.</p>
        </div>

        @if (linkSent) {
          <div class="success-box glass-panel">
            <i class="fa-solid fa-circle-check text-emerald"></i>
            <h4>Reset Link Dispatched</h4>
            <p>We've sent a password reset token to <strong>{{ forgotForm.value.email }}</strong>.</p>
            <a routerLink="/auth/login" class="btn-primary btn-sm mt-3">Return to Sign In</a>
          </div>
        } @else {
          <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="auth-form">
            <div class="custom-form-field">
              <label for="email">Work Email</label>
              <input id="email" type="email" formControlName="email" placeholder="alex.mercer@enterprise.io" />
            </div>

            <button type="submit" class="btn-primary auth-btn" [disabled]="forgotForm.invalid || isLoading">
              @if (isLoading) {
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                <span>Sending Link...</span>
              } @else {
                <i class="fa-solid fa-paper-plane"></i>
                <span>Send Reset Link</span>
              }
            </button>
          </form>
        }

        <div class="auth-footer">
          <a routerLink="/auth/login"><i class="fa-solid fa-arrow-left"></i> Back to Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
    .auth-card { width: 100%; max-width: 440px; padding: 40px; }
    .auth-header { text-align: center; margin-bottom: 24px; h2 { font-size: 1.4rem; font-weight: 800; } p { font-size: 0.88rem; color: var(--text-secondary); } }
    .auth-form { display: flex; flex-direction: column; gap: 16px; }
    .auth-btn { width: 100%; padding: 12px; }
    .auth-footer { text-align: center; margin-top: 24px; a { color: var(--text-secondary); font-size: 0.88rem; &:hover { color: var(--primary-color); } } }
    .success-box { padding: 24px; text-align: center; border-radius: var(--border-radius-md); h4 { margin: 12px 0 6px; } p { font-size: 0.85rem; color: var(--text-secondary); } }
    .text-emerald { color: #10b981; font-size: 2.5rem; }
    .mt-3 { margin-top: 16px; }
  `]
})
export class ForgotPasswordComponent {
  public fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public linkSent = false;
  public isLoading = false;

  public forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  public onSubmit(): void {
    if (this.forgotForm.invalid) return;
    this.isLoading = true;
    this.authService.forgotPassword(this.forgotForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.linkSent = true;
      },
      error: () => { this.isLoading = false; }
    });
  }
}
