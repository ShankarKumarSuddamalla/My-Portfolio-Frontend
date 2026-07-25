export type ProjectStatus = 'COMPLETED' | 'IN_DEVELOPMENT' | 'ARCHIVED' | 'PLANNED';

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  problemStatement: string;
  solution: string;
  architectureDiagramUrl?: string;
  architectureNotes?: string;
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
  features: string[];
  bannerUrl: string;
  screenshots: string[];
  githubRepoUrl: string;
  liveDemoUrl: string;
  challenges: string[];
  learnings: string[];
  futureEnhancements: string[];
  status: ProjectStatus;
  tags: string[];
  isFeatured: boolean;
  viewsCount: number;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}
