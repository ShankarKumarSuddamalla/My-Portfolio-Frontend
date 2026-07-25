export interface VisitorTrend {
  date: string;
  count: number;
}

export interface ProjectViewStat {
  projectId: string;
  projectName: string;
  views: number;
}

export interface ActivityLog {
  id: string;
  type: 'PROJECT_VIEW' | 'RESUME_DOWNLOAD' | 'MESSAGE_SENT' | 'LOGIN' | 'SYSTEM';
  description: string;
  timestamp: string;
  ipAddress?: string;
  location?: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  totalProjectViews: number;
  totalResumeDownloads: number;
  totalMessages: number;
  visitorTrends: VisitorTrend[];
  topProjects: ProjectViewStat[];
  recentActivities: ActivityLog[];
}
