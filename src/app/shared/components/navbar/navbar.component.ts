import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="public-navbar glass-panel">
      <div class="nav-container">
        <!-- Logo -->
        <a href="#hero" (click)="scrollTo('hero', $event)" class="nav-brand">
          <div class="brand-icon">
            <i class="fa-solid fa-code-branch"></i>
          </div>
          <div class="brand-text">
            <span class="name">SHANKAR KUMAR</span>
            <span class="tag">BACKEND & FULL-STACK ENGINEER</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="nav-links">
          <a href="#about" (click)="scrollTo('about', $event)" class="nav-link">About</a>
          <a href="#skills" (click)="scrollTo('skills', $event)" class="nav-link">Skills</a>
          <a href="#experience" (click)="scrollTo('experience', $event)" class="nav-link">Experience</a>
          <a href="#education" (click)="scrollTo('education', $event)" class="nav-link">Education</a>
          <a href="#projects" (click)="scrollTo('projects', $event)" class="nav-link">Projects</a>
          <a href="#ideas" (click)="scrollTo('ideas', $event)" class="nav-link">Roadmap</a>
          <a href="#resume" (click)="scrollTo('resume', $event)" class="nav-link">Resume</a>
          <a href="#contact" (click)="scrollTo('contact', $event)" class="nav-link">Contact</a>
        </div><!-- he-->

        <!-- Right Controls -->
        <div class="nav-actions">
          <!-- Theme Toggler -->
          <button (click)="themeService.toggleTheme()" class="theme-toggle-btn" [attr.aria-label]="'Switch theme'">
            @if (themeService.currentTheme() === 'dark') {
              <i class="fa-solid fa-sun text-amber"></i>
            } @else {
              <i class="fa-solid fa-moon text-indigo"></i>
            }
          </button>

          <!-- Auth CTA Button -->
          @if (authService.isAuthenticated()) {
            <a routerLink="/admin/dashboard" class="btn-primary btn-sm">
              <i class="fa-solid fa-gauge-high"></i>
              <span>Admin CMS</span>
            </a>
          } @else {
            <a routerLink="/auth/login" class="btn-secondary btn-sm">
              <i class="fa-solid fa-lock"></i>
              <span>Sign In</span>
            </a>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .public-navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 14px 24px;
      border-bottom: 1px solid var(--glass-border);
    }
    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .brand-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--border-radius-sm);
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 1.2rem;
      box-shadow: 0 4px 15px var(--primary-glow);
    }
    .brand-text {
      display: flex;
      flex-direction: column;
      .name {
        font-weight: 800;
        font-size: 1.1rem;
        letter-spacing: -0.02em;
        color: var(--text-main);
      }
      .tag {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--primary-color);
      }
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 24px;
      
      @media (max-width: 900px) {
        display: none;
      }
    }
    .nav-link {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      transition: color var(--transition-fast);
      &:hover {
        color: var(--primary-color);
      }
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .theme-toggle-btn {
      width: 40px;
      height: 40px;
      border-radius: var(--border-radius-full);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: all var(--transition-fast);
      &:hover {
        background: var(--bg-card-hover);
        transform: scale(1.05);
      }
    }
    .btn-sm {
      padding: 8px 16px;
      font-size: 0.85rem;
    }
    .text-amber { color: #f59e0b; }
    .text-indigo { color: #6366f1; }
  `]
})
export class NavbarComponent {
  public themeService = inject(ThemeService);
  public authService = inject(AuthService);
  private router = inject(Router);

  public scrollTo(sectionId: string, event: Event): void {
    if (event) {
      event.preventDefault();
    }

    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/' && currentUrl !== '') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.executeScroll(sectionId), 100);
      });
    } else {
      this.executeScroll(sectionId);
    }
  }

  private executeScroll(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
