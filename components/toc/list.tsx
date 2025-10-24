'use client';

import { Anchor, theme as AntdTheme, ConfigProvider } from 'antd';
import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ThemeContext } from '../../app/layout';
import MenuIcon from '../../icons/menu.svg';

const { defaultAlgorithm, darkAlgorithm } = AntdTheme;

export default function TocList({ html }: { html: string }) {
	const [showTrigger, setShowTrigger] = useState(false);
	const [showTocModel, setShowTocModel] = useState(false);
	const tocRef = useRef<HTMLDivElement>(null);

	const { theme } = useContext(ThemeContext);

	const localTheme = theme === 'dark' ? darkAlgorithm : defaultAlgorithm;

	useEffect(() => {
		setShowTrigger(true);
	}, []);

	useEffect(() => {
		if (showTocModel) {
			// 锁定背景滚动
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [showTocModel]);

	const resolve = (html: string) => {
		const reg = /<h(2|3)>(.+)<\/h(2|3)>/g;
		const list = [];
		let match: RegExpExecArray | null;
		// biome-ignore lint/suspicious/noAssignInExpressions: 允许赋值
		while ((match = reg.exec(html))) {
			list.push({ text: match[2], level: match[1] });
		}
		return list;
	};
	const list = resolve(html);

	// biome-ignore lint/correctness/noNestedComponentDefinitions: 内部复用
	const List = ({ offsetTop }: { offsetTop: number }) => (
		<ConfigProvider
			theme={{
				algorithm: localTheme
			}}
		>
			<Anchor
				offsetTop={offsetTop}
				items={list.map(item => ({
					key: item.text,
					href: `#${item.text}`,
					title: item.text,
					className: clsx('text-sm', {
						'!pl-7': item.level === '3'
					})
				}))}
			/>
		</ConfigProvider>
	);

	// biome-ignore lint/correctness/noNestedComponentDefinitions: 内部复用
	const ModelList = () => {
		return (
			<div
				className="fixed top-15 left-0 w-full h-screen bg-black/20 dark:bg-black z-100 lg:hidden"
				onClick={() => setShowTocModel(false)}
			>
				<div className="py-4 bg-white">
					<div
						ref={tocRef}
						className="max-h-100 overflow-y-auto px-4 relative"
						onTouchMove={e => e.stopPropagation()}
						onTouchStart={e => e.stopPropagation()}
						onTouchEnd={e => e.stopPropagation()}
					>
						<List offsetTop={0} />
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<List offsetTop={108} />
			{showTrigger &&
				createPortal(
					<MenuIcon
						className="w-5 lg:hidden cursor-pointer"
						onClick={() => setShowTocModel(!showTocModel)}
					/>,
					document.querySelector('.header-handler')!
				)}
			{showTocModel && createPortal(<ModelList />, document.body)}
		</>
	);
}
