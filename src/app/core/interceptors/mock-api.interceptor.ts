import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { STORAGE_KEYS } from '../constants/storage-keys';
import {
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_EXPERIENCE,
  INITIAL_EDUCATION,
  INITIAL_FUTURE_PROJECTS,
  INITIAL_IDEAS,
  INITIAL_PROFILE,
  INITIAL_CONTACT_MESSAGES
} from '../constants/initial-data';
import { User, AuthResponse } from '../models/auth.model';

import { environment } from '../../../environments/environment';

// Helper to seed localStorage
const seedStorageIfEmpty = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(INITIAL_SKILLS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(INITIAL_EXPERIENCE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EDUCATION)) {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(INITIAL_EDUCATION));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FUTURE_PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.FUTURE_PROJECTS, JSON.stringify(INITIAL_FUTURE_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.IDEAS)) {
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(INITIAL_IDEAS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(INITIAL_CONTACT_MESSAGES));
  }
};

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMockApi || !req.url.includes('/api/')) {
    return next(req);
  }

  seedStorageIfEmpty();

  const url = req.url;
  const method = req.method;
  const body = req.body as any;

  // AUTH API ENDPOINTS
  if (url.endsWith('/api/auth/login') && method === 'POST') {
    const { email, password } = body;
    if (email === 'suddamallashankarkumar@gmail.com' && password === 'Shankar@8374') {
      return of(new HttpResponse({
        status: 200,
        body: {
          mfaRequired: true,
          mobileNumber: '+91 9876543210',
          tempToken: 'temp-mfa-session-token-8374',
          generatedOtp: '837429'
        }
      })).pipe(delay(350));
    }
    return throwError(() => new HttpErrorResponse({ status: 400, error: { message: 'Invalid email or password. Use suddamallashankarkumar@gmail.com / Shankar@8374' } }));
  }

  if (url.endsWith('/api/auth/verify-mfa') && method === 'POST') {
    const { tempToken, otp } = body;
    if (tempToken && otp === '837429') {
      const mockUser: User = {
        id: 'usr-admin-01',
        fullName: 'Shankar Kumar Suddamalla',
        username: 'shankarkumars',
        email: 'suddamallashankarkumar@gmail.com',
        mobileNumber: '+91 9876543210',
        role: 'ADMIN',
        avatarUrl: '/assets/profile.png',
        createdAt: new Date().toISOString()
      };
      const response: AuthResponse = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-jwt-access-token-shankar',
        refreshToken: 'mock-jwt-refresh-token-shankar',
        user: mockUser,
        expiresIn: 86400
      };
      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(350));
    }
    return throwError(() => new HttpErrorResponse({ status: 400, error: { message: 'Invalid MFA verification code.' } }));
  }

  if (url.endsWith('/api/auth/register') && method === 'POST') {
    return of(new HttpResponse({ status: 200, body: { message: 'User registered successfully.' } })).pipe(delay(350));
  }

  if (url.endsWith('/api/auth/forgot-password') && method === 'POST') {
    return of(new HttpResponse({ status: 200, body: { message: 'Password reset link sent to your registered email address.' } })).pipe(delay(300));
  }

  if (url.endsWith('/api/auth/reset-password') && method === 'POST') {
    return of(new HttpResponse({ status: 200, body: { message: 'Password updated successfully. Please log in.' } })).pipe(delay(300));
  }

  // PROFILE
  if (url.endsWith('/api/profile') && method === 'GET') {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || '{}');
    return of(new HttpResponse({ status: 200, body: profile })).pipe(delay(200));
  }
  if (url.endsWith('/api/profile') && method === 'PUT') {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(body));
    return of(new HttpResponse({ status: 200, body: body })).pipe(delay(250));
  }

  // PROJECTS CRUD
  if (url.endsWith('/api/projects') && method === 'GET') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    return of(new HttpResponse({ status: 200, body: list })).pipe(delay(200));
  }
  if (url.endsWith('/api/projects') && method === 'POST') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    const newItem = { ...body, id: 'proj-' + Date.now(), viewsCount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    return of(new HttpResponse({ status: 201, body: newItem })).pipe(delay(300));
  }
  if (url.includes('/api/projects/') && method === 'PUT') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    list = list.map((item: any) => (item.id === id ? { ...item, ...body, updatedAt: new Date().toISOString() } : item));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body })).pipe(delay(300));
  }
  if (url.includes('/api/projects/') && method === 'DELETE') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    list = list.filter((item: any) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(250));
  }

  // SKILLS CRUD
  if (url.endsWith('/api/skills') && method === 'GET') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    return of(new HttpResponse({ status: 200, body: list })).pipe(delay(200));
  }
  if (url.endsWith('/api/skills') && method === 'POST') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    const newItem = { ...body, id: 's-' + Date.now() };
    list.push(newItem);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(list));
    return of(new HttpResponse({ status: 201, body: newItem })).pipe(delay(250));
  }
  if (url.includes('/api/skills/') && method === 'PUT') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    list = list.map((item: any) => (item.id === id ? { ...item, ...body } : item));
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body })).pipe(delay(250));
  }
  if (url.includes('/api/skills/') && method === 'DELETE') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILLS) || '[]');
    list = list.filter((item: any) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(200));
  }

  // EXPERIENCE CRUD
  if (url.endsWith('/api/experience') && method === 'GET') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPERIENCE) || '[]');
    return of(new HttpResponse({ status: 200, body: list })).pipe(delay(200));
  }
  if (url.endsWith('/api/experience') && method === 'POST') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPERIENCE) || '[]');
    const newItem = { ...body, id: 'exp-' + Date.now() };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(list));
    return of(new HttpResponse({ status: 201, body: newItem })).pipe(delay(250));
  }
  if (url.includes('/api/experience/') && method === 'PUT') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPERIENCE) || '[]');
    list = list.map((item: any) => (item.id === id ? { ...item, ...body } : item));
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body })).pipe(delay(250));
  }
  if (url.includes('/api/experience/') && method === 'DELETE') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPERIENCE) || '[]');
    list = list.filter((item: any) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(200));
  }

  // EDUCATION CRUD
  if (url.endsWith('/api/education') && method === 'GET') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EDUCATION) || '[]');
    return of(new HttpResponse({ status: 200, body: list })).pipe(delay(200));
  }
  if (url.endsWith('/api/education') && method === 'POST') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EDUCATION) || '[]');
    const newItem = { ...body, id: 'edu-' + Date.now() };
    list.push(newItem);
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(list));
    return of(new HttpResponse({ status: 201, body: newItem })).pipe(delay(250));
  }
  if (url.includes('/api/education/') && method === 'PUT') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EDUCATION) || '[]');
    list = list.map((item: any) => (item.id === id ? { ...item, ...body } : item));
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body })).pipe(delay(250));
  }
  if (url.includes('/api/education/') && method === 'DELETE') {
    const id = url.split('/').pop();
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.EDUCATION) || '[]');
    list = list.filter((item: any) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(list));
    return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(200));
  }

  // IDEAS & FUTURE PROJECTS
  if (url.endsWith('/api/future-projects') && method === 'GET') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FUTURE_PROJECTS) || '[]');
    return of(new HttpResponse({ status: 200, body: list })).pipe(delay(200));
  }
  if (url.endsWith('/api/future-projects') && method === 'POST') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FUTURE_PROJECTS) || '[]');
    const newItem = { ...body, id: 'fp-' + Date.now() };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.FUTURE_PROJECTS, JSON.stringify(list));
    return of(new HttpResponse({ status: 201, body: newItem })).pipe(delay(250));
  }

  if (url.endsWith('/api/ideas') && method === 'GET') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDEAS) || '[]');
    return of(new HttpResponse({ status: 200, body: list })).pipe(delay(200));
  }
  if (url.endsWith('/api/ideas') && method === 'POST') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.IDEAS) || '[]');
    const newItem = { ...body, id: 'idea-' + Date.now() };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(list));
    return of(new HttpResponse({ status: 201, body: newItem })).pipe(delay(250));
  }

  // CONTACT MESSAGES
  if (url.endsWith('/api/contact') && method === 'GET') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES) || '[]');
    return of(new HttpResponse({ status: 200, body: list })).pipe(delay(200));
  }
  if (url.endsWith('/api/contact') && method === 'POST') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES) || '[]');
    const newMsg = { ...body, id: 'msg-' + Date.now(), createdAt: new Date().toISOString(), isRead: false };
    list.unshift(newMsg);
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(list));
    return of(new HttpResponse({ status: 201, body: { success: true, message: 'Message sent successfully.' } })).pipe(delay(300));
  }

  // ANALYTICS DATA
  if (url.endsWith('/api/analytics') && method === 'GET') {
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES) || '[]');
    
    const analytics = {
      totalVisitors: 12480,
      totalProjectViews: projects.reduce((acc: number, p: any) => acc + (p.viewsCount || 0), 0),
      totalResumeDownloads: 840,
      totalMessages: messages.length,
      visitorTrends: [
        { date: 'Mon', count: 1200 },
        { date: 'Tue', count: 1850 },
        { date: 'Wed', count: 2400 },
        { date: 'Thu', count: 2100 },
        { date: 'Fri', count: 2950 },
        { date: 'Sat', count: 1600 },
        { date: 'Sun', count: 1400 }
      ],
      topProjects: projects.map((p: any) => ({ projectId: p.id, projectName: p.name, views: p.viewsCount || 100 })),
      recentActivities: [
        { id: 'act-1', type: 'PROJECT_VIEW', description: 'User viewed NexusFlow Enterprise Mesh', timestamp: '5 mins ago' },
        { id: 'act-2', type: 'RESUME_DOWNLOAD', description: 'Resume downloaded from San Francisco, CA', timestamp: '12 mins ago' },
        { id: 'act-3', type: 'MESSAGE_SENT', description: 'New inquiry received from Sarah Jenkins', timestamp: '2 hours ago' },
        { id: 'act-4', type: 'LOGIN', description: 'Admin logged in from Chrome (Mac OS)', timestamp: '1 day ago' }
      ]
    };
    return of(new HttpResponse({ status: 200, body: analytics })).pipe(delay(250));
  }

  return next(req);
};
