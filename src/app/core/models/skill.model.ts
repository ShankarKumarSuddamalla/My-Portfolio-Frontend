export type SkillCategory = 
  | 'Languages' 
  | 'Frameworks' 
  | 'Databases' 
  | 'Messaging' 
  | 'Caching' 
  | 'Cloud' 
  | 'DevOps' 
  | 'Testing' 
  | 'Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  proficiency: number; // 0 to 100
  yearsOfExperience: number;
  displayOrder: number;
  isFeatured: boolean;
}
