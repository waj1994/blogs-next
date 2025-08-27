import { getPostsList, resolveMarkdown } from '../utils';

import dayjs from 'dayjs';

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const post = (await getPostsList()).find(post => {
    return post.slug === slug;
  })!;

  const html = await resolveMarkdown(post.content);

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold">{post.metadata.title}</h1>
        <div className="text-sm text-gray-500">
          <span>
            {dayjs(post.metadata.date).format('YYYY-MM-DD')} ·{' '}
            {post.readingTime}
          </span>
        </div>
      </div>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
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
