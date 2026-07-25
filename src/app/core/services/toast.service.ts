import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts = signal<ToastMessage[]>([]);

  public show(type: ToastType, title: string, message: string, duration = 4000): void {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, message, duration };

    this.toasts.update(current => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  public success(title: string, message: string): void {
    this.show('success', title, message);
  }

  public error(title: string, message: string): void {
    this.show('error', title, message);
  }

  public warning(title: string, message: string): void {
    this.show('warning', title, message);
  }

  public info(title: string, message: string): void {
    this.show('info', title, message);
  }

  public remove(id: string): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
