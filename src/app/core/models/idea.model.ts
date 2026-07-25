export type IdeaPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface FutureProject {
  id: string;
  title: string;
  description: string;
  roadmap: string[];
  expectedStack: string[];
  priority: IdeaPriority;
  currentProgress: number; // 0 - 100
  targetCompletionQuarter: string;
}

export interface ProjectIdea {
  id: string;
  ideaName: string;
  description: string;
  realWorldImpact: string;
  possibleTechStack: string[];
  futureScope: string;
  difficulty: 'Easy' | 'Intermediate' | 'Hard' | 'Expert';
}
