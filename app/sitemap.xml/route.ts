// app/sitemap.xml/route.ts
import { getAllPosts } from '@/lib/mdx';
import { fetchAllExternalArticles } from '@/lib/external-articles';

export async function GET() {
  const baseUrl = 'https://rancorder.vercel.app';
  
  // 内部ブログ記事
  let posts: any[] = [];
  try {
    posts = getAllPosts();
  } catch (error) {
    console.error('Failed to get posts for sitemap:', error);
    posts = [];
  }

  // 外部記事（Qiita/Zenn）- タイムアウト付き
  let externalArticles: any[] = [];
  try {
    // 10秒でタイムアウト
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 10000)
    );
    
    const fetchPromise = fetchAllExternalArticles();
    
    externalArticles = await Promise.race([
      fetchPromise,
      timeoutPromise
    ]) as any[];
    
    console.log(`Successfully fetched ${externalArticles.length} external articles for sitemap`);
  } catch (error) {
    console.error('Failed to fetch external articles for sitemap (continuing without them):', error);
    externalArticles = [];
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
  ${externalArticles
    .map(
      (article) => {
        try {
          return `
  <url>
    <loc>${article.link}</loc>
    <lastmod>${new Date(article.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
        } catch (error) {
          console.error('Error formatting external article:', error);
          return '';
        }
      }
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

// 動的レンダリング（外部API呼び出しのため）
export const dynamic = 'force-dynamic';
