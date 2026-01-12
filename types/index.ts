// types/index.ts - プロジェクト全体の型定義

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  highlights: string[];
  pmDecisions?: string[];
  links?: {
    github?: string;
    demo?: string;
    article?: string;
  };
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
  content: string;
}

export interface ExternalArticle {
  title: string;
  url: string;
  summary: string;
  publishedDate: string;
  platform: 'Qiita' | 'Zenn' | 'note';
}
