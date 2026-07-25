import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnalyticsData } from '../models/analytics.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/analytics`;

  public getAnalytics(): Observable<AnalyticsData> {
    const defaultData: AnalyticsData = {
      totalVisitors: 12480,
      totalProjectViews: 3150,
      totalResumeDownloads: 840,
      totalMessages: 5,
      visitorTrends: [
        { date: 'Mon', count: 120 },
        { date: 'Tue', count: 180 },
        { date: 'Wed', count: 240 },
        { date: 'Thu', count: 210 },
        { date: 'Fri', count: 310 },
        { date: 'Sat', count: 280 },
        { date: 'Sun', count: 390 }
      ],
      topProjects: [
        { projectId: 'proj-1', projectName: 'Distributed Load Balancer', views: 1850 },
        { projectId: 'proj-2', projectName: 'Microservices E-Commerce', views: 1420 },
        { projectId: 'proj-3', projectName: 'Inventory Management System', views: 1100 }
      ],
      recentActivities: [
        { id: 'act-1', type: 'LOGIN', description: 'System Administrator logged in (2FA Verified)', timestamp: 'Just now' },
        { id: 'act-2', type: 'PROJECT_VIEW', description: 'Distributed Load Balancer viewed from India', timestamp: '12 mins ago' },
        { id: 'act-3', type: 'RESUME_DOWNLOAD', description: 'Executive Resume PDF downloaded', timestamp: '45 mins ago' },
        { id: 'act-4', type: 'MESSAGE_SENT', description: 'New contact message received from recruiter', timestamp: '2 hours ago' }
      ]
    };

    return this.http.get<AnalyticsData>(this.apiUrl).pipe(
      catchError(() => of(defaultData))
    );
  }
}
