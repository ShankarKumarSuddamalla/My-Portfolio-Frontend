import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AnalyticsData } from '../../core/models/analytics.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <div>
          <h2>System Telemetry & Content Overview</h2>
          <p>Real-time analytics, content metrics, and administrative quick actions</p>
        </div>
        <a routerLink="/admin/projects" class="btn-primary">
          <i class="fa-solid fa-plus"></i>
          <span>New Project Entry</span>
        </a>
      </div>

      <!-- Stat Counters Grid -->
      <div class="stats-grid">
        <div class="stat-card glass-card">
          <div class="stat-top">
            <div class="stat-icon icon-indigo"><i class="fa-solid fa-eye"></i></div>
            <span class="stat-trend text-emerald">+18% this week</span>
          </div>
          <span class="stat-value">{{ analytics()?.totalVisitors || 12480 | number }}</span>
          <span class="stat-label">Total Unique Visitors</span>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-top">
            <div class="stat-icon icon-purple"><i class="fa-solid fa-diagram-project"></i></div>
            <span class="stat-trend text-emerald">+3 new</span>
          </div>
          <span class="stat-value">{{ analytics()?.totalProjectViews || 3150 | number }}</span>
          <span class="stat-label">Project System Views</span>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-top">
            <div class="stat-icon icon-cyan"><i class="fa-solid fa-file-arrow-down"></i></div>
            <span class="stat-trend text-emerald">+12 downloads</span>
          </div>
          <span class="stat-value">{{ analytics()?.totalResumeDownloads || 840 | number }}</span>
          <span class="stat-label">Resume Downloads</span>
        </div>

        <div class="stat-card glass-card">
          <div class="stat-top">
            <div class="stat-icon icon-amber"><i class="fa-solid fa-envelope"></i></div>
            <span class="stat-trend text-amber">2 unread</span>
          </div>
          <span class="stat-value">{{ analytics()?.totalMessages || 2 }}</span>
          <span class="stat-label">Contact Inquiries</span>
        </div>
      </div>

      <!-- Chart & Activities Grid -->
      <div class="dashboard-grid">
        <!-- SVG Traffic Visualizer -->
        <div class="chart-card glass-card">
          <div class="card-header">
            <h3><i class="fa-solid fa-chart-area text-indigo"></i> Visitor Traffic Trend (7-Day Scale)</h3>
          </div>
          <div class="chart-box">
            <svg viewBox="0 0 500 180" class="chart-svg">
              <!-- Gradient Definition -->
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <path d="M 10 140 Q 80 100, 150 70 T 300 40 T 490 20 L 490 170 L 10 170 Z" fill="url(#chartGradient)"/>
              <path d="M 10 140 Q 80 100, 150 70 T 300 40 T 490 20" fill="none" stroke="#6366f1" stroke-width="3"/>
              <!-- Data Points -->
              <circle cx="10" cy="140" r="4" fill="#818cf8"/>
              <circle cx="90" cy="110" r="4" fill="#818cf8"/>
              <circle cx="170" cy="70" r="4" fill="#818cf8"/>
              <circle cx="250" cy="85" r="4" fill="#818cf8"/>
              <circle cx="330" cy="40" r="4" fill="#818cf8"/>
              <circle cx="410" cy="60" r="4" fill="#818cf8"/>
              <circle cx="490" cy="20" r="4" fill="#38bdf8"/>
            </svg>
            <div class="chart-labels">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        <!-- Recent Activities Feed -->
        <div class="activity-card glass-card">
          <div class="card-header">
            <h3><i class="fa-solid fa-list-check text-cyan"></i> Audit Activity Logs</h3>
          </div>
          <div class="activity-list">
            @for (act of analytics()?.recentActivities; track act.id) {
              <div class="activity-item">
                <div class="act-icon"><i class="fa-solid fa-circle-dot text-indigo"></i></div>
                <div class="act-details">
                  <span class="act-desc">{{ act.description }}</span>
                  <span class="act-time">{{ act.timestamp }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { display: flex; flex-direction: column; gap: 24px; }
    .dashboard-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .stat-card { padding: 22px; display: flex; flex-direction: column; }
    .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .stat-icon { width: 44px; height: 44px; border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
    .icon-indigo { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
    .icon-purple { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
    .icon-cyan { background: rgba(14, 165, 233, 0.15); color: #38bdf8; }
    .icon-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .stat-trend { font-size: 0.75rem; font-weight: 700; }
    .stat-value { font-size: 2rem; font-weight: 800; margin-bottom: 2px; }
    .stat-label { font-size: 0.82rem; color: var(--text-muted); font-weight: 600; }
    
    .dashboard-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 24px; @media (max-width: 950px) { grid-template-columns: 1fr; } }
    .chart-card, .activity-card { padding: 24px; }
    .card-header { margin-bottom: 20px; h3 { font-size: 1.1rem; font-weight: 800; display: flex; align-items: center; gap: 10px; margin: 0; } }
    .chart-box { position: relative; width: 100%; }
    .chart-svg { width: 100%; height: 180px; overflow: visible; }
    .chart-labels { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); font-weight: 600; padding: 0 10px; }
    .activity-list { display: flex; flex-direction: column; gap: 16px; }
    .activity-item { display: flex; align-items: flex-start; gap: 14px; .act-icon { margin-top: 2px; font-size: 0.8rem; } .act-details { display: flex; flex-direction: column; .act-desc { font-size: 0.88rem; color: var(--text-main); font-weight: 600; } .act-time { font-size: 0.75rem; color: var(--text-muted); } } }
    .text-emerald { color: #10b981; }
    .text-indigo { color: #818cf8; }
    .text-cyan { color: #38bdf8; }
    .text-amber { color: #f59e0b; }
  `]
})
export class DashboardComponent implements OnInit {
  public analyticsService = inject(AnalyticsService);
  public analytics = signal<AnalyticsData | null>(null);

  public ngOnInit(): void {
    this.analyticsService.getAnalytics().subscribe(data => this.analytics.set(data));
  }
}
