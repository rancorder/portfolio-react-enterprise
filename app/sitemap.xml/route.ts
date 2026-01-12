// app/sitemap.xml/route.ts
import { getAllPosts } from '@/lib/mdx';

export async function GET() {
  const baseUrl = 'https://rancorder.vercel.app';
  
  // 内部ブログ記事
  let posts: any[] = [];
  try {
    posts = getAllPosts();
  } catch (error) {
    console.error('Failed to get posts for sitemap:', error);
  }

  // 静的ページ
  const staticPages = [
    '',           // トップページ
    '/ja',        // 日本語ページ
    '/blog',      // ブログ一覧
  ];

  // XMLを生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

// ISR: 1時間ごとに再生成
export const revalidate = 3600;
