'use client';

import clsx from 'clsx';
import { cloneElement, type ReactElement, useState } from 'react';
import ArrowsIcon from '@/icons/arrows.svg';

export default function Tip({
	type,
	children
}: {
	type: TipType.Type;
	children: React.ReactNode;
}) {
	const [collapsed, setCollapsed] = useState(type === 'details');

	const collapsedClass = clsx('overflow-hidden', {
		'h-0 !my-0': collapsed,
		'!my-2 ': !collapsed
	});

	return (
		<div
			className={clsx('my-4 text-tip px-4 pt-4 pb-2 rounded-lg leading-6', {
				'bg-tip-bg-default': type === 'info' || type === 'details',
				'bg-tip-bg': type === 'tip',
				'bg-tip-bg-warning': type === 'warning',
				'bg-tip-bg-danger': type === 'danger'
			})}
		>
			<p
				className={clsx('!m-0 !mb-2 font-semibold flex items-center gap-x-2', {
					'cursor-pointer': type === 'details'
				})}
				onClick={() => type === 'details' && setCollapsed(!collapsed)}
			>
				{type === 'details' && (
					<ArrowsIcon
						className={clsx('w-3 transition py-1', {
							'rotate-180': collapsed
						})}
					/>
				)}
				{type.toLocaleUpperCase()}
			</p>
			{children &&
				(Array.isArray(children) ? (
					<div className={collapsedClass}>{children.map(item => item)}</div>
				) : (
					cloneElement(children as ReactElement<{ className: string }>, {
						className: collapsedClass
					})
				))}
		</div>
	);
}
