// data/skills.ts
import { Skill } from '../types';

export const skills: Skill[] = [
  {
    category: 'PMスキル',
    items: [
      '要件定義・仕様策定',
      'プロダクト立上げ管理',
      '複数プロジェクト並行推進',
      'エンタープライズ顧客折衝',
      '技術的意思決定',
      '品質管理・納期管理',
    ],
  },
  {
    category: 'フロントエンド',
    items: [
      'Next.js 14 / React',
      'TypeScript',
      'Three.js（3D表現）',
      'Canvas API',
      'レスポンシブデザイン',
      'HTML5 / CSS3',
    ],
  },
  {
    category: 'プログラミング',
    items: [
      'Python（実務レベル）',
      'JavaScript（基礎）',
      'FastAPI, Flask',
      'BeautifulSoup, Playwright',
      'pandas, numpy',
    ],
  },
  {
    category: 'インフラ・運用',
    items: [
      'Docker / Docker Compose',
      'Linux / systemd',
      'VPS運用（24/7）',
      'Prometheus / Grafana',
      'Redis / PostgreSQL / SQLite',
    ],
  },
  {
    category: '品質・テスト',
    items: [
      'pytest / pytest-cov',
      'mypy（strict mode）',
      'Type Hints（型安全性）',
      'k6（負荷試験）',
      'CI/CD（軽量構築）',
    ],
  },
  {
    category: 'AI・機械学習',
    items: [
      'scikit-learn, XGBoost',
      'Whisper（音声処理）',
      'BERT（自然言語処理）',
      'OpenCV（画像処理）',
      '特徴量エンジニアリング',
    ],
  },
];
