// types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  url?: string;
  category: 'backend' | 'frontend' | 'infrastructure' | 'ml';
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  value: string;
  description: string;
}

export interface Experience {
  title: string;
  period: string;
  description: string;
  achievements?: string[];
}
