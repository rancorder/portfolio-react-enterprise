// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'H・M - Product Manager & Full Stack Engineer Portfolio',
  description: '製造業PM 17年 × フルスタックエンジニア。エンタープライズ経験と技術実装を融合するProduct Manager。',
  keywords: ['Product Manager', 'Full Stack Engineer', 'Enterprise', 'Python', 'Next.js', 'React'],
  openGraph: {
    title: 'H・M - Product Manager & Full Stack Engineer',
    description: '製造業17年の経験と本番運用レベルの技術実装力',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
