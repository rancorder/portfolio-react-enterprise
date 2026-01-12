/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  // 外部画像許可（Qiita/Zennのサムネイル用）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qiita-user-contents.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
