// data/projects.ts
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'scraping-platform',
    title: '54サイト統合スクレイピング基盤',
    description: '24時間365日稼働する大規模データ収集システムの設計・実装・運用',
    category: 'backend',
    technologies: ['Python', 'SQLite WAL', 'systemd', 'cron', 'VPS運用', 'Chatwork API'],
    metrics: [
      { label: '統合サイト数', value: '54' },
      { label: '監視URL数', value: '96' },
      { label: '月間処理件数', value: '10万件' },
      { label: 'エラー率', value: '0.1%未満' },
      { label: '連続稼働実績', value: '11ヶ月' },
      { label: '工数削減効果', value: '年1000時間超' },
    ],
    highlights: [
      'Exponential Backoffによる安定したリトライ戦略',
      'Circuit Breaker（Netflix Hystrix準拠）でシステム全体の安定性確保',
      'SQLite WALモードと排他制御による高速・安全なデータアクセス',
      '優先度別実行制御（Priority 1: 動的間隔、Priority 2: 5分固定）',
      '詳細なロギングとエラーハンドリングによる運用品質の維持',
    ],
  },
  {
    id: 'crystal-dreamscape',
    title: 'Crystal Dreamscape Portfolio（3Dインタラクティブサイト）',
    description: 'Three.jsとCanvas APIを活用した3Dパーティクルシステムを実装。10,000個以上のパーティクルをリアルタイムでレンダリング。',
    category: 'frontend',
    technologies: ['Next.js 14', 'TypeScript', 'Three.js', 'Canvas API', 'ISR', 'Vercel'],
    highlights: [
      'RequestAnimationFrame最適化で60fps維持',
      'パーティクルシステムの物理演算実装',
      'レスポンシブ対応（モバイル〜4K）',
      'Next.js ISRによる高速ページ生成',
    ],
    url: 'https://portfolio-crystal-dreamscape.vercel.app/',
  },
  {
    id: 'sre-system',
    title: 'SRE実証システム（本番級負荷試験）',
    description: 'Docker Composeで6サービスを統合し、FastAPI・Redis・PostgreSQLを組み合わせた本番運用想定の構成を構築。',
    category: 'infrastructure',
    technologies: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker Compose', 'k6', 'Prometheus', 'Grafana'],
    highlights: [
      'k6による負荷試験で13,060リクエストをエラー率0%で処理',
      '平均応答時間1.69ms（P95: 2.37ms）を達成',
      'SREの基礎能力を数値で証明',
    ],
  },
  {
    id: 'pytest-improvement',
    title: '既存プロダクトへのpytest導入（品質改善）',
    description: 'テストゼロの1400行コードに、pytestで自動テスト環境を後付け構築。',
    category: 'backend',
    technologies: ['pytest', 'pytest-cov', 'mypy', 'Type Hints'],
    highlights: [
      '30テストを実装しカバレッジ26%を達成',
      '型ヒント100%化とProtocol・Frozen Dataclass導入',
      '動作のみで維持されていたコードを「安全に変更可能な品質レベル」へ引き上げ',
    ],
  },
  {
    id: 'stock-prediction',
    title: '株価予測システム（機械学習・自動運用）',
    description: 'XGBoostによる株価予測モデルを構築。テクニカル指標15種の特徴量設計。',
    category: 'ml',
    technologies: ['XGBoost', 'scikit-learn', 'pandas', 'GridSearchCV', 'cron'],
    highlights: [
      'GridSearchCVによるハイパーパラメータチューニング',
      'バックテストR² = 0.72を達成',
      '朝夕の自動運用で再現可能なMLOpsの実例を構築',
    ],
  },
  {
    id: 'voice-emotion',
    title: '音声感情分析（マルチモーダルAI）',
    description: 'Whisper（音声認識）+ BERT（感情分析）+ OpenSMILE（音響特徴）のLate Fusion構成。',
    category: 'ml',
    technologies: ['Whisper', 'BERT', 'OpenSMILE', 'Gradio'],
    highlights: [
      '音声・テキスト・音響特性の融合で単体モデル比+15%の精度向上',
      '推論速度3〜5秒、精度85%を達成',
    ],
  },
];
