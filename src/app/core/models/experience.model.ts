export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string; // 'Present' or ISO date
  isCurrent: boolean;
  responsibilities: string[];
  achievements: string[];
  technologyUsed: string[];
  companyLogoUrl?: string;
  displayOrder: number;
}
