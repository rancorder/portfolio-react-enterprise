// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'rancorder | Technical PM Portfolio',
  description:
    '製造業PM 17年 × フルスタック実装。エンタープライズB2Bで要件・品質・運用の意思決定を行うTechnical PM。',
  openGraph: {
    title: 'rancorder | Technical PM Portfolio',
    description:
      '製造業PM 17年 × フルスタック実装。エンタープライズB2Bで要件・品質・運用の意思決定を行うTechnical PM。',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
