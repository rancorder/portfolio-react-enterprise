# 🚀 Enterprise React Portfolio

エンタープライズグレードのReact製ポートフォリオサイト

## ✨ 特徴

### 技術スタック
- **Next.js 14** - App Router
- **React 18** - Client Components
- **TypeScript** - 完全型安全
- **Framer Motion** - スムーズなアニメーション
- **Intersection Observer API** - スクロールアニメーション

### 実装内容
- ✅ モダンなダークテーマUI
- ✅ スムーズなページ遷移アニメーション
- ✅ プロジェクトフィルタリング機能
- ✅ レスポンシブデザイン（モバイル対応）
- ✅ SEO最適化（Meta tags完備）
- ✅ TypeScript型安全実装
- ✅ コンポーネントベース設計

## 🚀 クイックスタート

### 1. 依存関係インストール

\`\`\`bash
npm install
\`\`\`

### 2. 開発サーバー起動

\`\`\`bash
npm run dev
\`\`\`

開発サーバー: http://localhost:3000

### 3. ビルド

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 プロジェクト構造

\`\`\`
portfolio-react-enterprise/
├── app/
│   ├── layout.tsx          # Root Layout (SEO metadata)
│   └── page.tsx            # Main Page (React Components)
├── data/
│   ├── projects.ts         # プロジェクトデータ
│   └── skills.ts           # スキルデータ
├── types/
│   └── index.ts            # TypeScript型定義
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
\`\`\`

## 🎨 カスタマイズ

### データ更新

#### プロジェクト追加

\`data/projects.ts\` を編集:

\`\`\`typescript
{
  id: 'new-project',
  title: 'プロジェクト名',
  description: '説明',
  category: 'backend', // 'backend' | 'frontend' | 'infrastructure' | 'ml'
  technologies: ['Python', 'FastAPI'],
  highlights: [
    '実装内容1',
    '実装内容2',
  ],
}
\`\`\`

#### スキル追加

\`data/skills.ts\` を編集:

\`\`\`typescript
{
  category: 'カテゴリ名',
  items: ['スキル1', 'スキル2'],
}
\`\`\`

### デザイン変更

\`app/page.tsx\` の \`:root\` CSS変数を編集:

\`\`\`css
:root {
  --primary: #2563eb;        /* メインカラー */
  --accent: #10b981;          /* アクセントカラー */
  --bg-darker: #020617;       /* 背景色 */
}
\`\`\`

## 🌐 デプロイ

### Vercel（推奨）

\`\`\`bash
# GitHubにプッシュ
git init
git add .
git commit -m "feat: initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-react-enterprise.git
git push -u origin main

# Vercel CLIでデプロイ
npx vercel
\`\`\`

または Vercel Dashboard から GitHub連携でデプロイ

### Netlify

\`\`\`bash
# ビルド
npm run build

# Netlify CLIでデプロイ
npx netlify deploy --prod --dir=.next
\`\`\`

## 📊 パフォーマンス

### 最適化内容
- Framer Motion による GPU アクセラレーション
- Intersection Observer による遅延レンダリング
- Next.js 画像最適化
- CSS-in-JS によるスコープ化

### 期待値
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## 🎯 React実装のポイント

### 1. Framer Motion アニメーション

\`\`\`typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
\`\`\`

### 2. Intersection Observer

\`\`\`typescript
const [ref, inView] = useInView({ 
  threshold: 0.3, 
  triggerOnce: true 
});

<motion.section
  ref={ref}
  animate={inView ? "visible" : "hidden"}
>
\`\`\`

### 3. 動的フィルタリング

\`\`\`typescript
const [activeCategory, setActiveCategory] = useState('all');

const filteredProjects = activeCategory === 'all' 
  ? projects 
  : projects.filter(p => p.category === activeCategory);
\`\`\`

## 🔧 技術選定理由

### Next.js 14
- App Router による高速ルーティング
- SEO 最適化機能
- 自動コード分割

### Framer Motion
- 宣言的アニメーション
- GPU アクセラレーション
- React との親和性

### TypeScript
- 型安全性
- エディタサポート
- バグ削減

## 📝 今後の拡張案

- [ ] ブログ機能（MDX対応）
- [ ] ダークモード切替
- [ ] 多言語対応（i18n）
- [ ] お問い合わせフォーム
- [ ] Google Analytics統合

## 📄 ライセンス

MIT License

---

**Made with ⚡ Next.js + React + TypeScript**
