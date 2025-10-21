import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	output: 'standalone',
	compress: true,
	images: {
		domains: ['iwangjie.top'], // 允许加载的图片域名
		minimumCacheTTL: 60 * 60 * 24 * 30 // 静态图片缓存30天
	}
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
