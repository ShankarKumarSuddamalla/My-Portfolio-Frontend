import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';
import { passwordMatchValidator } from '../register/register.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page-container">
      <div class="auth-card glass-card">
        <div class="auth-header">
          <h2>Reset Password</h2>
          <p>Create a new strong password for your administrator account.</p>
        </div>

        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="custom-form-field">
            <label for="newPassword">New Password</label>
            <input id="newPassword" type="password" formControlName="newPassword" placeholder="••••••••••••" />
          </div>

          <div class="custom-form-field">
            <label for="confirmPassword">Confirm New Password</label>
            <input id="confirmPassword" type="password" formControlName="confirmPassword" placeholder="••••••••••••" />
            <span *ngIf="resetForm.hasError('passwordMismatch') && resetForm.get('confirmPassword')?.touched" class="error-text">
              Passwords do not match.
            </span>
          </div>

          <button type="submit" class="btn-primary auth-btn" [disabled]="resetForm.invalid || isLoading">
            @if (isLoading) {
              <i class="fa-solid fa-circle-notch fa-spin"></i>
              <span>Updating Password...</span>
            } @else {
              <i class="fa-solid fa-key"></i>
              <span>Save New Password</span>
            }
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-page-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
    .auth-card { width: 100%; max-width: 440px; padding: 40px; }
    .auth-header { text-align: center; margin-bottom: 24px; h2 { font-size: 1.4rem; font-weight: 800; } p { font-size: 0.88rem; color: var(--text-secondary); } }
    .auth-form { display: flex; flex-direction: column; gap: 16px; }
    .auth-btn { width: 100%; padding: 12px; }
  `]
})
export class ResetPasswordComponent {
  public fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public router = inject(Router);
  public isLoading = false;

  public resetForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  public onSubmit(): void {
    if (this.resetForm.invalid) return;
    this.isLoading = true;
    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      },
      error: () => { this.isLoading = false; }
    });
  }
}
