/** @type {import('next-sitemap').IConfig} */
const config = {
	// 站点基础 URL（必填）
	siteUrl: process.env.SITE_URL || 'http://iwangjie.top:5173',

	// 生成的 sitemap 文件路径
	generateRobotsTxt: true, // 自动生成 robots.txt
	outDir: 'public', // 输出目录（默认 next.js 的 public 文件夹）

	// 生成规则
	generate姜: true,
	routes: {
		// 动态生成路由（如博客列表）
		// 例如动态生成 `/blog/[slug]` 的所有 slug：
		// async blog() {
		//   const res = await fetch('https://iwangjie.top/posts');
		//   const posts = await res.json();
		//   return posts.map(post => `/blog/${post.slug}`);
		// }
	},

	// 可选参数（按需配置）
	changefreq: 'monthly', // 默认变更频率
	priority: 0.7, // 默认优先级（0~1）
	sitemapSize: 5000 // 每个 sitemap 的最大条目数（超过则分文件）
};

export default config;
