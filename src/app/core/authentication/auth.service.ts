import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User, AuthResponse, LoginCredentials, ForgotPasswordData, ResetPasswordData } from '../models/auth.model';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { ToastService } from '../services/toast.service';
import { environment } from '../../../environments/environment';

export interface MfaChallengeResponse {
  mfaRequired: boolean;
  mobileNumber: string;
  tempToken: string;
  generatedOtp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toast = inject(ToastService);

  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal<boolean>(false);
  public isAuthLoading = signal<boolean>(false);

  private readonly API_URL = `${environment.apiUrl}/auth`;

  constructor() {
    this.checkAutoLogin();
  }

  private checkAutoLogin(): void {
    const token = this.getToken();
    const storedUserStr = localStorage.getItem(STORAGE_KEYS.USER_DATA);

    if (token && storedUserStr) {
      try {
        const user: User = JSON.parse(storedUserStr);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch {
        this.logout();
      }
    }
  }

  public initiateLogin(credentials: LoginCredentials): Observable<MfaChallengeResponse> {
    this.isAuthLoading.set(true);
    return this.http.post<MfaChallengeResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(() => {
        this.isAuthLoading.set(false);
      }),
      catchError((err) => {
        this.isAuthLoading.set(false);
        const errorMsg = err?.error?.message || 'Invalid email or password.';
        this.toast.error('Authentication Error', errorMsg);
        return throwError(() => err);
      })
    );
  }

  public verifyMfaOtp(tempToken: string, otp: string): Observable<AuthResponse> {
    this.isAuthLoading.set(true);
    return this.http.post<AuthResponse>(`${this.API_URL}/verify-mfa`, { tempToken, otp }).pipe(
      tap((res) => {
        this.setSession(res);
        this.toast.success('MFA Verification Successful', `Authenticated as ${res.user.fullName}`);
        this.isAuthLoading.set(false);
      }),
      catchError((err) => {
        this.isAuthLoading.set(false);
        const errorMsg = err?.error?.message || 'Invalid OTP code.';
        this.toast.error('MFA Failed', errorMsg);
        return throwError(() => err);
      })
    );
  }

  public register(data: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/register`, data).pipe(
      tap(() => {
        this.toast.success('Registration Disabled', 'Account creation is disabled. Please log in as Administrator.');
      })
    );
  }

  public forgotPassword(data: ForgotPasswordData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/forgot-password`, data).pipe(
      tap((res) => {
        this.toast.info('Password Reset Sent', res.message || 'Reset link sent to your email.');
      })
    );
  }

  public resetPassword(data: ResetPasswordData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/reset-password`, data).pipe(
      tap((res) => {
        this.toast.success('Password Reset', res.message || 'Your password has been successfully updated.');
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.toast.info('Logged Out', 'You have been safely logged out.');
    this.router.navigate(['/auth/login']);
  }

  public getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, authResult.token);
    if (authResult.refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authResult.refreshToken);
    }
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(authResult.user));
    
    this.currentUser.set(authResult.user);
    this.isAuthenticated.set(true);
  }
}
