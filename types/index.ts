// types/index.ts
export type ProjectCategory = 'enterprise' | 'product' | 'infrastructure' | 'technical' | 'all';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, 'all'>;
  technologies: string[];
  highlights: string[];
  /** PMとしての判断（トレードオフ、スコープ、運用設計など） */
  pmDecisions?: string[];
  links?: {
    demo?: string;
    github?: string;
    article?: string;
  };
}

export interface SkillGroup {
  category: string;
  items: string[];
}
