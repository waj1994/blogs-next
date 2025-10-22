import Link from 'next/link';
import BaseSearch from './base-search';
import ThemeButton from './theme-button';

export default function BaseHeader() {
	return (
		<header className="px-8 h-15 flex items-center mb-12 justify-between sticky top-0 bg-white dark:bg-black">
			<h2 className="text-xl font-bold">
				<Link
					href="/"
					className="text-gray-600"
				>
					w
				</Link>
			</h2>
			<div className="flex items-center gap-x-4">
				{/* <BaseSearch /> */}
				<ThemeButton />
			</div>
		</header>
	);
}
