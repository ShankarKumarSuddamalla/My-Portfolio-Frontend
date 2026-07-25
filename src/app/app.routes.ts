import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // PUBLIC PORTFOLIO
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public-portfolio/public-portfolio.component').then(m => m.PublicPortfolioComponent),
        title: 'Shankar Kumar Suddamalla | Backend Java & Full-Stack Portfolio'
      }
    ]
  },

  // AUTHENTICATION MODULE
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        title: 'Sign In | Enterprise CMS'
      },
      {
        path: 'register',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        title: 'Forgot Password | Enterprise CMS'
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        title: 'Reset Password | Enterprise CMS'
      }
    ]
  },

  // ADMIN CMS DASHBOARD (AUTH GUARD PROTECTED)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard Overview | Admin CMS'
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
        title: 'Projects Management | Admin CMS'
      },
      {
        path: 'skills',
        loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent),
        title: 'Skills Taxonomy | Admin CMS'
      },
      {
        path: 'experience',
        loadComponent: () => import('./features/work-experience/work-experience.component').then(m => m.WorkExperienceComponent),
        title: 'Experience History | Admin CMS'
      },
      {
        path: 'education',
        loadComponent: () => import('./features/education/education.component').then(m => m.EducationComponent),
        title: 'Education Records | Admin CMS'
      },
      {
        path: 'ideas',
        loadComponent: () => import('./features/ideas/ideas.component').then(m => m.IdeasComponent),
        title: 'Roadmap & Ideas | Admin CMS'
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent),
        title: 'Traffic Analytics | Admin CMS'
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactManagementComponent),
        title: 'Contact Inbox | Admin CMS'
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile Settings | Admin CMS'
      }
    ]
  },

  // ERROR PAGES
  {
    path: 'error/403',
    loadComponent: () => import('./features/error-pages/error-403.component').then(m => m.Error403Component),
    title: '403 Access Denied'
  },
  {
    path: 'error/404',
    loadComponent: () => import('./features/error-pages/error-404.component').then(m => m.Error404Component),
    title: '404 Not Found'
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];
