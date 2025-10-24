import clsx from 'clsx';
import matter from 'gray-matter';
import { type ReactNode, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import CodeBlock from './CodeBlock';
import CodeLine from './CodeLine';
import Tip from './Tip';

function Preview({
	content,
	className
}: {
	content: string;
	className?: string;
}) {
	let matterBody = null;
	try {
		matterBody = matter(content.toString());
	} catch {}

	const h2Render = useCallback((props: { children?: ReactNode }) => {
		return <h2 id={props.children as string}>{props.children}</h2>;
	}, []);
	const h3Render = useCallback((props: { children?: ReactNode }) => {
		return <h3 id={props.children as string}>{props.children}</h3>;
	}, []);

	const codeRender = useCallback(
		(props: { children?: ReactNode; className?: string }) => {
			const { children, className } = props;
			if (!(children as string)?.endsWith('\n')) {
				return <CodeLine code={children as string} />;
			}
			const language = className?.replace('language-', '') || 'text';
			return (
				<CodeBlock
					code={children as string}
					language={language}
				/>
			);
		},
		[]
	);

	// 1. 定义一个自定义插件来处理指令节点
	const remarkCustomDirectives = useCallback(() => {
		return (tree: any) => {
			visit(tree, node => {
				// 检查节点是否为容器指令，并且名称是 'tip'
				if (
					node.type === 'containerDirective' &&
					['tip', 'info', 'warning', 'danger', 'details'].includes(node.name)
				) {
					node.data = node.data || {};
					node.data.hName = 'tip';
					node.data.hProperties = { type: node.name };
				}
			});
		};
	}, []);

	const tipRender = useCallback(
		({ type, children }: { children?: ReactNode; type: TipType.Type }) => {
			return <Tip type={type}>{children}</Tip>;
		},
		[]
	);

	return (
		<div
			className={clsx('flex-1 h-full overflow-auto', className)}
			style={{
				scrollbarWidth: 'none'
			}}
		>
			<div className="markdown-body">
				<h1 hidden={!matterBody?.data?.title}>{matterBody?.data.title}</h1>
				<ReactMarkdown
					rehypePlugins={[rehypeRaw, rehypeStringify]}
					remarkPlugins={[
						remarkParse,
						[remarkGfm, { singleTilde: false }],
						remarkBreaks,
						remarkDirective,
						remarkCustomDirectives,
						remarkRehype
					]}
					components={{
						code: codeRender,
						// @ts-expect-error visit自定义
						tip: tipRender,
						h2: h2Render,
						h3: h3Render
					}}
				>
					{matterBody?.content}
				</ReactMarkdown>
			</div>
		</div>
	);
}

export default Preview;
