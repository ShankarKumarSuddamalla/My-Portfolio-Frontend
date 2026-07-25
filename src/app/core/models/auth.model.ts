export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  mobileNumber: string;
  role: 'ADMIN' | 'USER';
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token?: string;
  newPassword: string;
  confirmPassword: string;
}
