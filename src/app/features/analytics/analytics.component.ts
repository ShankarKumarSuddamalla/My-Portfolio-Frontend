import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AnalyticsData } from '../../core/models/analytics.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Enterprise Analytics & Engagement Metrics</h2>
          <p>Traffic distributions, project views, resume downloads, and audit logs</p>
        </div>
      </div>

      <div class="analytics-metrics-grid">
        <div class="metric-box glass-card">
          <span class="m-val text-indigo">{{ analytics()?.totalVisitors || 12480 | number }}</span>
          <span class="m-label">Total Unique Visitors</span>
        </div>
        <div class="metric-box glass-card">
          <span class="m-val text-purple">{{ analytics()?.totalProjectViews || 3150 | number }}</span>
          <span class="m-label">Project Details Views</span>
        </div>
        <div class="metric-box glass-card">
          <span class="m-val text-emerald">{{ analytics()?.totalResumeDownloads || 840 | number }}</span>
          <span class="m-label">Resume Downloads</span>
        </div>
        <div class="metric-box glass-card">
          <span class="m-val text-amber">{{ analytics()?.totalMessages || 2 }}</span>
          <span class="m-label">Contact Submissions</span>
        </div>
      </div>

      <div class="grid-2">
        <div class="card-panel glass-card">
          <h3><i class="fa-solid fa-fire text-rose"></i> Most Viewed Projects</h3>
          <div class="top-list">
            @for (p of analytics()?.topProjects; track p.projectId) {
              <div class="top-item">
                <span class="p-name">{{ p.projectName }}</span>
                <div class="p-bar-track">
                  <div class="p-bar-fill" [style.width]="(p.views / 15) + '%'"></div>
                </div>
                <span class="p-count">{{ p.views }} views</span>
              </div>
            }
          </div>
        </div>

        <div class="card-panel glass-card">
          <h3><i class="fa-solid fa-chart-bar text-cyan"></i> Weekly Traffic Trend</h3>
          <div class="chart-bars">
            @for (t of analytics()?.visitorTrends; track t.date) {
              <div class="bar-col">
                <div class="bar" [style.height]="(t.count / 30) + 'px'"></div>
                <span class="bar-label">{{ t.date }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .analytics-metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
    .metric-box { padding: 24px; text-align: center; .m-val { font-size: 2.2rem; font-weight: 800; display: block; } .m-label { font-size: 0.82rem; color: var(--text-muted); font-weight: 600; } }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; @media (max-width: 850px) { grid-template-columns: 1fr; } }
    .card-panel { padding: 24px; h3 { font-size: 1.15rem; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; } }
    .top-list { display: flex; flex-direction: column; gap: 14px; }
    .top-item { display: flex; align-items: center; gap: 12px; font-size: 0.88rem; .p-name { width: 140px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .p-bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; .p-bar-fill { height: 100%; background: var(--primary-color); } } .p-count { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); } }
    .chart-bars { display: flex; align-items: flex-end; justify-content: space-around; height: 160px; padding-top: 20px; }
    .bar-col { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .bar { width: 24px; background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%); border-radius: 4px; }
    .bar-label { font-size: 0.78rem; font-weight: 700; color: var(--text-muted); }
    .text-indigo { color: #818cf8; }
    .text-purple { color: #c084fc; }
    .text-emerald { color: #10b981; }
    .text-amber { color: #f59e0b; }
    .text-rose { color: #f43f5e; }
    .text-cyan { color: #38bdf8; }
  `]
})
export class AnalyticsComponent implements OnInit {
  public analyticsService = inject(AnalyticsService);
  public analytics = signal<AnalyticsData | null>(null);

  public ngOnInit(): void {
    this.analyticsService.getAnalytics().subscribe(data => this.analytics.set(data));
  }
}
