'use client';

import { copy } from 'clipboard';
import clsx from 'clsx';
import { type CSSProperties, memo, useEffect, useState } from 'react';
import ArrowsIcon from '../../../icons/arrows.svg';
import { useShiki } from '../hooks/useShiki';
import { SHIKI_SUPPORT_LANGS } from '../shiki-language';

function CodeBlock({ code, language }: { code: string; language: string }) {
	const [lineList, setLineList] = useState<string[]>([]);
	const [preStyle, setPreStyle] = useState<CSSProperties>({});
	const [preClassName, setPreClassName] = useState('');

	const { codeToHtml } = useShiki();

	const resolveStyle = (str: string) => {
		const list = str.split(';');
		return list.reduce((pre, cur) => {
			const [key, value] = cur.split(':');
			return {
				...pre,
				[key.replace(/(-[a-z])/g, $1 => $1.slice(1).toLocaleUpperCase())]: value
			};
		}, {} as CSSProperties);
	};

	async function getHtml() {
		let html = '';
		try {
			html = await codeToHtml(code, {
				lang: SHIKI_SUPPORT_LANGS.find(name => name === language) || 'text',
				theme: 'vitesse-light'
			});
		} catch {}

		if (!html) {
			return;
		}

		const parse = new DOMParser();
		const doc = parse.parseFromString(html, 'text/html');
		const preElement = doc.querySelector('pre');
		const style = resolveStyle(preElement?.getAttribute('style') || '');
		setPreStyle(style);
		setPreClassName(preElement?.className || '');
		const codeElement = doc.querySelector('pre code');
		if (codeElement) {
			const lines = codeElement.querySelectorAll('.line'); // 获取所有代码行
			setLineList(Array.from(lines).map(line => line.outerHTML));
		}
	}

	useEffect(() => {
		getHtml();
	}, [code, language]);

	const [collapsed, setCollapsed] = useState(false);
	const handleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const [copyText, setCopyText] = useState('复制代码');
	function handleCopy() {
		copy(code);
		setCopyText('已复制');
		setTimeout(() => {
			setCopyText('复制代码');
		}, 1000);
	}

	return (
		<div
			className={clsx(preClassName, 'text-[14px]')}
			style={preStyle}
		>
			<div className="flex items-center justify-between px-4 py-2 bg-[#ededed] dark:bg-black select-none">
				<div
					className="flex items-center gap-x-2 cursor-pointer"
					onClick={handleCollapsed}
				>
					<span className="font-bold">{language}</span>
					<span className="hover:bg-[#ebedf0] rounded-5 px-1">
						<ArrowsIcon
							className={clsx('w-3 transition py-1', {
								'rotate-180': collapsed
							})}
						/>
					</span>
				</div>
				<span
					className="cursor-pointer"
					onClick={handleCopy}
				>
					{copyText}
				</span>
			</div>

			<div
				className={clsx(
					'bg-white dark:bg-[var(--bgColor-default)] overflow-y-hidden',
					{
						'!h-0': collapsed
					}
				)}
			>
				<div className="p-4">
					<code className={`language-${language}`}>
						{lineList.map((line, index) => (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: 不涉及删除使用index做key
								key={line + index}
								className="block leading-5"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: 自定义内容渲染
								dangerouslySetInnerHTML={{ __html: line }}
							/>
						))}
					</code>
				</div>
			</div>
		</div>
	);
}

export default memo(CodeBlock, (prev, next) => {
	return prev.code === next.code && prev.language === next.language;
});
