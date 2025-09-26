import dayjs from 'dayjs';
import fs from 'fs';
import { globby } from 'globby';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export interface Metadata {
	title: string;
	description: string;
	date: Date;
}

/**
 * 解析markdown
 */
export const resolveMarkdown = async (content: string) => {
	const html = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeStringify)
		.use(rehypeHighlight)
		.process(content);
	return html.toString();
};

/**
 * 获取文章列表
 */
export const getPostsList = async () => {
	const list = await globby('content/**/*.md(x)?');
	return await Promise.all(
		list.map(async item => {
			const { content, data } = matter(fs.readFileSync(item));
			const html = await resolveMarkdown(content);
			return {
				content,
				metadata: data as Metadata,
				slug: item.split('/').at(-1)!.split('.')[0],
				readingTime: `${Math.ceil(readingTime(html).minutes)}min`,
				html
			};
		})
	);
};

/**
 * 按时间排序
 */
export const sortByTime = (list: Awaited<ReturnType<typeof getPostsList>>) => {
	const result: Record<string, Awaited<ReturnType<typeof getPostsList>>> = {};
	list.forEach(item => {
		const year = dayjs(item.metadata.date).format('YYYY');
		result[year] = [...(result?.[year] || []), item];
		result[year].sort(
			(a, b) => dayjs(b.metadata.date).unix() - dayjs(a.metadata.date).unix()
		);
	});
	return result;
};
