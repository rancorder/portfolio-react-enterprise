// types/index.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'backend' | 'frontend' | 'infrastructure' | 'ml';
  technologies: string[];
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
  content?: string;
}

export interface ExternalArticle {
  title: string;
  url: string;
  summary: string;
  publishedDate: string;
  platform: 'Qiita' | 'Zenn' | 'note';
}
