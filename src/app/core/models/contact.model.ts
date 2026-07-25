export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SocialLinks {
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  email: string;
  location: string;
}
