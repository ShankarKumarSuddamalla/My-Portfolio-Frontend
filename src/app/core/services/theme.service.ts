import { Injectable, signal, effect } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage-keys';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme = signal<ThemeMode>('dark');

  constructor() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME_MODE) as ThemeMode;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme.set(savedTheme);
    } else {
      this.currentTheme.set('dark');
    }

    this.applyTheme(this.currentTheme());

    effect(() => {
      const mode = this.currentTheme();
      this.applyTheme(mode);
      localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
    });
  }

  public toggleTheme(): void {
    this.currentTheme.update(theme => (theme === 'dark' ? 'light' : 'dark'));
  }

  public setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
  }
}
