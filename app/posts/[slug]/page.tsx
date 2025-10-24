import dayjs from 'dayjs';
import Preview from '@/components/markdown/preview';
import TocList from '@/components/toc/list';
import { getPostsList } from '../utils';

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
	const { slug } = await params;

	const post = (await getPostsList()).find(post => {
		return post.slug === slug;
	})!;

	return (
		<div className="lg:pl-60 inline-flex gap-x-10">
			<div className="max-w-[75ch] w-full">
				<div className="flex flex-col gap-4 mb-8">
					<h1 className="text-3xl font-bold">{post.metadata.title}</h1>
					<div className="text-sm text-gray-500">
						<span>
							{dayjs(post.metadata.date).format('YYYY-MM-DD')} ·{' '}
							{post.readingTime}
						</span>
					</div>
				</div>
				<Preview content={post.content} />
			</div>
			<div className="w-50 hidden lg:block">
				<TocList html={post.html} />
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	return await getPostsList();
}

export async function generateMetadata({ params }: { params: Params }) {
	const { slug } = await params;
	const post = (await getPostsList()).find(item => item.slug === slug);
	if (!post) {
		return;
	}
	const { metadata } = post;
	return metadata;
}

export const dynamicParams = false;
