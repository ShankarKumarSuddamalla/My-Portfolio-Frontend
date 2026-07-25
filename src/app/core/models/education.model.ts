export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  cgpa: string;
  startDate: string;
  endDate: string;
  achievements?: string[];
  displayOrder: number;
}
