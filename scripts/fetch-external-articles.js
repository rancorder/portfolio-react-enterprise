// scripts/fetch-external-articles.js
const fs = require('fs');
const path = require('path');

// Qiitaから記事を取得
async function fetchQiitaArticles(username) {
  try {
    const response = await fetch(`https://qiita.com/api/v2/users/${username}/items?per_page=20`);
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.map(item => ({
      title: item.title,
      link: item.url,
      date: item.created_at,
      source: 'Qiita',
      excerpt: item.body ? item.body.substring(0, 150).replace(/[#*`\n]/g, '') + '...' : '',
    }));
  } catch (error) {
    console.error('Failed to fetch Qiita articles:', error);
    return [];
  }
}

// Zennから記事を取得
async function fetchZennArticles(username) {
  try {
    const response = await fetch(`https://zenn.dev/api/articles?username=${username}&order=latest`);
    if (!response.ok) return [];
    
    const data = await response.json();
    return (data.articles || []).slice(0, 20).map(item => ({
      title: item.title,
      link: `https://zenn.dev${item.path}`,
      date: item.published_at || item.created_at,
      source: 'Zenn',
      excerpt: item.body_letters_count ? `${item.emoji} ${item.body_letters_count}文字` : '',
    }));
  } catch (error) {
    console.error('Failed to fetch Zenn articles:', error);
    return [];
  }
}

async function main() {
  console.log('Fetching external articles...');
  
  // あなたのユーザー名に変更
  const qiitaUsername = 'rancorder';
  const zennUsername = 'supermassu';
  
  const [qiitaArticles, zennArticles] = await Promise.all([
    fetchQiitaArticles(qiitaUsername),
    fetchZennArticles(zennUsername),
  ]);
  
  const allArticles = [...qiitaArticles, ...zennArticles]
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  console.log(`Found ${qiitaArticles.length} Qiita articles`);
  console.log(`Found ${zennArticles.length} Zenn articles`);
  console.log(`Total: ${allArticles.length} articles`);
  
  // JSONファイルに保存
  const outputPath = path.join(process.cwd(), 'public', 'external-articles.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(allArticles, null, 2));
  
  console.log(`Saved to ${outputPath}`);
}

main().catch(console.error);
