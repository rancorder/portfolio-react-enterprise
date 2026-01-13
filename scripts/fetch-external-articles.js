// scripts/fetch-external-articles.js
const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * HTTPSリクエストでJSONを取得
 */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Node.js)',
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${url}`));
            return;
          }
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error(`Failed to parse JSON from ${url}: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Markdownテキストをクリーニング
 */
function cleanMarkdown(text) {
  if (!text) return '';
  
  return text
    .replace(/```[\s\S]*?```/g, '')    // コードブロック削除
    .replace(/`[^`\n]+`/g, '')         // インラインコード削除
    .replace(/!\[.*?\]\(.*?\)/g, '')   // 画像削除
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // リンクをテキストに
    .replace(/^#{1,6}\s+/gm, '')       // 見出し記号削除
    .replace(/^[\*\-\+]\s+/gm, '')     // 箇条書き記号削除
    .replace(/^>\s+/gm, '')            // 引用記号削除
    .replace(/[*_~]{1,2}([^*_~]+)[*_~]{1,2}/g, '$1') // 強調記号削除
    .replace(/\n{2,}/g, '\n')          // 複数改行を1つに
    .replace(/\n/g, ' ')               // 改行をスペースに
    .replace(/\s+/g, ' ')              // 複数スペースを1つに
    .trim();
}

/**
 * テキストから適切な抜粋を抽出
 */
function extractExcerpt(text, maxLength = 150) {
  if (!text) return '';
  
  const cleaned = cleanMarkdown(text);
  if (!cleaned) return '';
  
  // 句読点で分割
  const sentences = cleaned.split(/[。．.!?！？]/);
  let excerpt = '';
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    
    if (excerpt.length === 0) {
      excerpt = trimmed;
    } else if (excerpt.length + trimmed.length + 1 < maxLength) {
      excerpt += '。' + trimmed;
    } else {
      break;
    }
  }
  
  // 短すぎる場合は先頭N文字
  if (excerpt.length < 50 && cleaned.length > 50) {
    excerpt = cleaned.substring(0, maxLength);
  }
  
  // 末尾処理
  if (excerpt && !excerpt.match(/[。．.!?！？]$/)) {
    excerpt += '...';
  }
  
  return excerpt;
}

/**
 * Qiitaから記事を取得
 */
async function fetchQiitaArticles(username) {
  try {
    console.log(`📗 Fetching Qiita articles for ${username}...`);
    const url = `https://qiita.com/api/v2/users/${username}/items?per_page=20`;
    const data = await fetchJSON(url);
    
    const articles = data.map(item => {
      let excerpt = '';
      
      if (item.body) {
        excerpt = extractExcerpt(item.body, 150);
      }
      
      if (!excerpt || excerpt.length < 30) {
        excerpt = `${item.title}についての技術記事です。`;
      }
      
      return {
        title: item.title,
        link: item.url,
        date: item.created_at,
        source: 'Qiita',
        excerpt: excerpt,
      };
    });
    
    console.log(`✅ Fetched ${articles.length} Qiita articles`);
    return articles;
  } catch (error) {
    console.error('❌ Failed to fetch Qiita articles:', error.message);
    return [];
  }
}

/**
 * Zenn記事の詳細を取得（スラッグからユーザー名を除去）
 */
async function fetchZennArticleDetail(slug) {
  try {
    // スラッグから記事IDのみを抽出（ユーザー名が含まれている場合）
    const articleId = slug.split('/').pop();
    const url = `https://zenn.dev/api/articles/${articleId}`;
    const data = await fetchJSON(url);
    return data.article;
  } catch (error) {
    return null;
  }
}

/**
 * Zennから記事を取得
 */
async function fetchZennArticles(username) {
  try {
    console.log(`⚡ Fetching Zenn articles for ${username}...`);
    const url = `https://zenn.dev/api/articles?username=${username}&order=latest`;
    const data = await fetchJSON(url);
    
    const articleList = (data.articles || []).slice(0, 20);
    console.log(`   Found ${articleList.length} articles, fetching details...`);
    
    const articlesWithDetails = [];
    
    // 5記事ずつバッチ処理
    for (let i = 0; i < articleList.length; i += 5) {
      const batch = articleList.slice(i, i + 5);
      
      const batchResults = await Promise.all(
        batch.map(async (item) => {
          let excerpt = '';
          
          // 詳細を取得して本文から抜粋を作成
          const detail = await fetchZennArticleDetail(item.slug);
          
          if (detail && detail.body_markdown) {
            excerpt = extractExcerpt(detail.body_markdown, 150);
            console.log(`   ✓ ${item.title.substring(0, 40)}... - Got excerpt (${excerpt.length} chars)`);
          }
          
          // フォールバック
          if (!excerpt || excerpt.length < 30) {
            if (detail && detail.body_markdown) {
              // 本文はあるが短い場合
              const firstPara = detail.body_markdown.split('\n\n')[0];
              excerpt = cleanMarkdown(firstPara).substring(0, 150) + '...';
            } else {
              // 本文が取得できない場合
              excerpt = `${item.emoji || '📝'} ${item.title}についての技術記事です。`;
            }
            console.log(`   ⚠ ${item.title.substring(0, 40)}... - Using fallback`);
          }
          
          return {
            title: item.title,
            link: `https://zenn.dev${item.path}`,
            date: item.published_at || item.created_at,
            source: 'Zenn',
            excerpt: excerpt,
          };
        })
      );
      
      articlesWithDetails.push(...batchResults);
      
      // API制限対策
      if (i + 5 < articleList.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    console.log(`✅ Fetched ${articlesWithDetails.length} Zenn articles with excerpts`);
    return articlesWithDetails;
  } catch (error) {
    console.error('❌ Failed to fetch Zenn articles:', error.message);
    return [];
  }
}

/**
 * メイン処理
 */
async function main() {
  console.log('\n🚀 Starting external articles fetch...\n');
  
  const qiitaUsername = 'rancorder';
  const zennUsername = 'supermassu';
  
  const [qiitaArticles, zennArticles] = await Promise.all([
    fetchQiitaArticles(qiitaUsername),
    fetchZennArticles(zennUsername),
  ]);
  
  const allArticles = [...qiitaArticles, ...zennArticles]
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  console.log(`\n📊 Summary:`);
  console.log(`   Qiita: ${qiitaArticles.length} articles`);
  console.log(`   Zenn:  ${zennArticles.length} articles`);
  console.log(`   Total: ${allArticles.length} articles\n`);
  
  const outputPath = path.join(process.cwd(), 'public', 'external-articles.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(allArticles, null, 2), 'utf-8');
  
  console.log(`💾 Saved to: ${outputPath}`);
  
  // サンプル表示
  if (allArticles.length > 0) {
    console.log('\n📝 Sample excerpts:\n');
    allArticles.slice(0, 3).forEach((article, idx) => {
      console.log(`${idx + 1}. [${article.source}] ${article.title.substring(0, 50)}...`);
      console.log(`   ${article.excerpt.substring(0, 100)}...`);
      console.log('');
    });
  }
  
  console.log('✨ Done!\n');
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
