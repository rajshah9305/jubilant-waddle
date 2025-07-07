export type StudioType = 'text' | 'code' | 'document' | 'creative';

export interface StudioConfig {
  id: StudioType;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  welcomeMessage: string;
  placeholder: string;
  supportsFileUpload: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  tokensUsed?: number;
}

export interface Project {
  id: number;
  title: string;
  content: string;
  studioType: StudioType;
  userId: number;
  tokensUsed: number;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricsData {
  tokensUsed: number;
  processingSpeed: number;
  totalProjects: number;
  avgResponseTime: number;
}
