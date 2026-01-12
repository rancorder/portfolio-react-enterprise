// app/sitemap.xml/route.ts
import { getAllPosts } from '@/lib/mdx';
import { fetchAllExternalArticles } from '@/lib/external-articles';

// 完全に動的レンダリング（ビルド時に生成しない）
export const dynamic = 'force-dynamic';
export const revalidate = 0; // キャッシュしない（テスト用）

export async function GET() {
  const baseUrl = 'https://rancorder.vercel.app';
  
  console.log('[Sitemap] Starting sitemap generation...');
  
  // 内部ブログ記事
  let posts: any[] = [];
  try {
    posts = getAllPosts();
    console.log(`[Sitemap] Found ${posts.length} internal posts`);
  } catch (error) {
    console.error('[Sitemap] Failed to get posts:', error);
    posts = [];
  }

  // 外部記事（Qiita/Zenn）
  let externalArticles: any[] = [];
  try {
    console.log('[Sitemap] Fetching external articles...');
    externalArticles = await fetchAllExternalArticles();
    console.log(`[Sitemap] Found ${externalArticles.length} external articles`);
  } catch (error) {
    console.error('[Sitemap] Failed to fetch external articles:', error);
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
          console.error('[Sitemap] Error formatting external article:', error);
          return '';
        }
      }
    )
    .join('')}
</urlset>`;

  console.log(`[Sitemap] Generated sitemap with ${staticPages.length} static pages, ${posts.length} posts, ${externalArticles.length} external articles`);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-cache', // テスト用：キャッシュなし
    },
  });
}
