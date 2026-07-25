import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pass = control.get('password')?.value;
  const confirmPass = control.get('confirmPassword')?.value;
  return pass === confirmPass ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page-container">
      <div class="auth-card glass-card">
        <div class="auth-header">
          <h2>Create Enterprise Account</h2>
          <p>Register as an administrator to manage portfolio content and projects</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="custom-form-field">
            <label for="fullName">Full Name</label>
            <input id="fullName" type="text" formControlName="fullName" placeholder="Alex Mercer" />
            <span *ngIf="isFieldInvalid('fullName')" class="error-text">Full name is required.</span>
          </div>

          <div class="form-row">
            <div class="custom-form-field">
              <label for="username">Username</label>
              <input id="username" type="text" formControlName="username" placeholder="alexmercer" />
              <span *ngIf="isFieldInvalid('username')" class="error-text">Username required.</span>
            </div>

            <div class="custom-form-field">
              <label for="mobileNumber">Mobile Number</label>
              <input id="mobileNumber" type="text" formControlName="mobileNumber" placeholder="+1 (555) 234-5678" />
              <span *ngIf="isFieldInvalid('mobileNumber')" class="error-text">Valid mobile required.</span>
            </div>
          </div>

          <div class="custom-form-field">
            <label for="email">Work Email</label>
            <input id="email" type="email" formControlName="email" placeholder="alex.mercer@enterprise.io" />
            <span *ngIf="isFieldInvalid('email')" class="error-text">Please enter a valid email.</span>
          </div>

          <div class="custom-form-field">
            <label for="password">Strong Password</label>
            <div class="input-with-icon">
              <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
                placeholder="••••••••••••"
                (input)="evaluatePasswordStrength()"
              />
              <button type="button" (click)="showPassword = !showPassword" class="toggle-eye" aria-label="Toggle password visibility">
                <i class="fa-solid" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            
            <!-- Password Strength Bar -->
            <div class="strength-bar-wrapper">
              <div class="strength-bar" [style.width]="passwordStrength + '%'" [ngClass]="strengthClass"></div>
            </div>
            <span class="strength-label">Strength: {{ strengthLabel }}</span>
          </div>

          <div class="custom-form-field">
            <label for="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" formControlName="confirmPassword" placeholder="••••••••••••" />
            <span *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched" class="error-text">
              Passwords do not match.
            </span>
          </div>

          <button type="submit" class="btn-primary auth-btn" [disabled]="registerForm.invalid || authService.isAuthLoading()">
            @if (authService.isAuthLoading()) {
              <i class="fa-solid fa-circle-notch fa-spin"></i>
              <span>Creating Account...</span>
            } @else {
              <i class="fa-solid fa-user-plus"></i>
              <span>Register Account</span>
            }
          </button>
        </form>

        <div class="auth-footer">
          <span>Already registered?</span>
          <a routerLink="/auth/login">Sign In</a>
        </div>
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
    }
    .auth-card {
      width: 100%;
      max-width: 500px;
      padding: 40px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 24px;
      h2 { font-size: 1.4rem; font-weight: 800; margin-bottom: 6px; }
      p { font-size: 0.88rem; color: var(--text-secondary); }
    }
    .auth-form { display: flex; flex-direction: column; gap: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .input-with-icon {
      position: relative;
      input { width: 100%; padding-right: 42px; }
    }
    .toggle-eye {
      position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
      background: transparent; border: none; color: var(--text-muted); cursor: pointer;
    }
    .strength-bar-wrapper {
      height: 4px; background: var(--border-color); border-radius: 2px; margin-top: 6px; overflow: hidden;
    }
    .strength-bar {
      height: 100%; transition: width 0.3s, background 0.3s;
      &.weak { background: #f43f5e; }
      &.medium { background: #f59e0b; }
      &.strong { background: #10b981; }
    }
    .strength-label { font-size: 0.75rem; color: var(--text-muted); }
    .auth-btn { width: 100%; padding: 12px; margin-top: 8px; }
    .auth-footer { text-align: center; margin-top: 20px; font-size: 0.88rem; color: var(--text-secondary); a { font-weight: 700; margin-left: 6px; } }
  `]
})
export class RegisterComponent {
  public fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public router = inject(Router);

  public showPassword = false;
  public passwordStrength = 0;
  public strengthLabel = 'Weak';
  public strengthClass = 'weak';

  public registerForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(3)]],
    mobileNumber: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  public isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public evaluatePasswordStrength(): void {
    const val = this.registerForm.get('password')?.value || '';
    let score = 0;
    if (val.length >= 6) score += 30;
    if (/[A-Z]/.test(val)) score += 25;
    if (/[0-9]/.test(val)) score += 25;
    if (/[^A-Za-z0-9]/.test(val)) score += 20;

    this.passwordStrength = score;
    if (score < 40) {
      this.strengthLabel = 'Weak';
      this.strengthClass = 'weak';
    } else if (score < 75) {
      this.strengthLabel = 'Medium';
      this.strengthClass = 'medium';
    } else {
      this.strengthLabel = 'Strong';
      this.strengthClass = 'strong';
    }
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
