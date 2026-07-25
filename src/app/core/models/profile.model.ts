import { SocialLinks } from './contact.model';

export interface UserProfile {
  fullName: string;
  title: string;
  headline: string;
  summary: string;
  yearsOfExperience: number;
  completedProjectsCount: number;
  avatarUrl: string;
  resumeUrl: string;
  location: string;
  availableForHire: boolean;
  socialLinks: SocialLinks;
}
